from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS , Vectara
from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter 

DATA_PATH = 'data/'
DB_VECTARA_PATH = 'vectorstore/db_vectara'

# Create vector database
def create_vector_db():
    loader = DirectoryLoader(DATA_PATH,
                             glob='*.pdf',
                             loader_cls=PyPDFLoader)

    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500,
                                                   chunk_overlap=50)
    texts = text_splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2',
                                       model_kwargs={'device': 'cpu'})

    db = Vectara.from_documents(texts , embeddings)
    db.save_local(DB_VECTARA_PATH)

if __name__ == "__main__":
    create_vector_db()

