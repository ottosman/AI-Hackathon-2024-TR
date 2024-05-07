from langchain import PromptTemplate
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import CTransformers
from langchain.chains import RetrievalQA
import chainlit as cl
import re

DB_FAISS_PATH = "vectorstores/db_faiss"

custom_prompt_template = """Use the following pieces of information to answer the user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context: {context}
Question: {question}

Only return the helpful answer below and nothing else.
Helpful answer:
"""

def is_pdf_question(query):
    # Identify questions about terms defined in the PDF using keywords or patterns
    # (e.g., "Nedir?", "Anlamı nedir?", "Tanımı nedir?")
    definition_keywords = ["nedir", "anlamı nedir", "tanımı nedir", "açıkla", "tanımla"]

    # Check for question structure (e.g., "What is X?", "Define X")
    question_structure_patterns = [
        r"(?:What|Who|Which|How|When|Where|Why) is (.*)\?",
        r"Define (.*)",
        r"Explain (.*)",
        r"What does (.*) mean",
    ]

    for keyword in definition_keywords:
        if keyword in query.lower():
            return True

    for pattern in question_structure_patterns:
        match = re.search(pattern, query, re.IGNORECASE)
        if match:
            return True

    return False

def search_pdf_knowledge_base(query, qa_result):
    response = qa_result({'query': query})

    # Extract question term from the query
    question_term = query.lower().split()[0]

    # Retrieve relevant passage using QA chain (assuming it returns the passage)
    passage = ...  # Get the passage from the QA chain response

    # Identify lines containing the question term or its variations
    potential_definitions = [line.strip() for line in passage.splitlines()
                              if question_term in line.lower()]

    # Choose the most relevant definition (heuristic approach)
    definition = None
    if potential_definitions:
        # Prioritize lines containing only the definition (assuming this is the case in your PDF)
        for candidate in potential_definitions:
            if len(candidate.split()) == 1:  # Only one word
                definition = candidate
                break
        # If no single-word definition found, use the first line
        if not definition:
            definition = potential_definitions[0]

    if definition:
        return f"According to the document: {definition}"
    else:
        return "Definition not found in the document."

def set_custom_prompt():
    """
    Prompt template for QA retrieval for each vectorstore
    """
    prompt = PromptTemplate(template=custom_prompt_template,
                            input_variables=['context', 'question'])
    return prompt


def load_llm():
    llm = CTransformers(
        model='llama-2-7b-chat.ggmlv3.q8_0.bin',
        model_type='llama',
        max_new_tokens=512,
        temperature=0.5
    )
    return llm

def retrieval_qa_chain(llm, prompt, db):
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=db.as_retriever(search_kwargs={'k': 2}),
        return_source_documents=True,
        chain_type_kwargs={'prompt': prompt}
    )
    return qa_chain


def qa_bot():
    embeddings = HuggingFaceEmbeddings(
        model_name='sentence-transformers/all-MiniLM-L6-v2'
        , model_kwargs={'device': 'cpu'}
    )
    db = FAISS.load_local(DB_FAISS_PATH, embeddings, allow_dangerous_deserialization=True)
    llm = load_llm()
    qa_prompt = set_custom_prompt()
    qa = retrieval_qa_chain(llm, qa_prompt, db)

    return qa


def final_result(query):
    qa_result = qa_bot()
    response = qa_result.split(":", 1)[1].strip()

    # Check for PDF-based questions (using refined is_pdf_question function)
    if is_pdf_question(query):
        response = search_pdf_knowledge_base(query, qa_result)
    else:
        pass
        # API call for location-specific traffic (e.g., "İzmir'de X kavşağında trafik durumu nasıl?")
        # ... (Implement API call logic as before)

    return response


# chainlit
@cl.on_chat_start
async def start():
    chain = qa_bot()
    msg = cl.Message(content="PowerpuffBoys ChatBot başlatılıyor...")
    await msg.send()
    msg.content = "Merhaba, PowerpuffBoys ChatBot'a hoş geldiniz. Size nasıl yardımcı olabilirim?"
    await msg.update()
    cl.user_session.set('chain', chain)


@cl.on_message
async def main(message: cl.Message):
    chain = cl.user_session.get('chain')
    cb = cl.AsyncLangchainCallbackHandler(
        stream_final_answer=True, answer_prefix_tokens=['FINAL', 'ANSWER']
    )
    cb.answer_reached = True
    res = await chain.acall(message.content, callbacks=[cb])
    answer = res['result']
    sources = res['source_documents']

    if sources:
        answer += f"\nSources:" + str(sources)
    else:
        answer += f"\nNo Sources Found"

    await cl.Message(content=answer).send()
