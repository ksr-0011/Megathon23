import json
from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'My Text to PDF', 0, 1, 'C')

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(10)

    def chapter_body(self, body):
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, body)
        self.ln()

trainFileName = "train_webmd_squad_v2_consec.json"
valFileName = "val_webmd_squad_v2_full.json"
folderPath = "./Qualcomm_Megathon'23/Megathon'23/data 2/"
with open(folderPath+trainFileName, 'r') as json_file:
    trainDatabase = json.load(json_file)

print(len(trainDatabase['data']))

outputTextLines = []

for i in trainDatabase['data']:
    title = i['title']
    dataPoint = i['paragraphs'][0]
    # dict_keys(['qas', 'sent_list', 'context', 'sent_starts'])
    qaList = dataPoint['qas']
    context = dataPoint['context']
    # print(title)
    for qNo in range(len(qaList)):
        # print(qaList[qNo].keys())

        outputTextLines.append(qaList[qNo]['question'])
        # print(qaList[qNo]['question'])

        answersPerQ = qaList[qNo]['answers']
        for aNo in range(len(answersPerQ)):
            # print(answersPerQ[aNo].keys())

            outputTextLines.append(answersPerQ[aNo]['text'])
            # print(answersPerQ[aNo]['text'])
        
        outputTextLines.append("")
        # print("")

outputText = '\n'.join(outputTextLines)
with open("out2.txt","w") as fileobj:
    fileobj.write(outputText)

### creating pdf from the data

# Create a PDF object
pdf = PDF()
pdf.add_page()

# Add a title and text to the PDF
pdf.chapter_title("MedicalQueries")
pdf.chapter_body(outputText)

# Save the PDF
pdf_filename = 'BhupendraJogiData2.pdf'
pdf.output(pdf_filename)

print(f"PDF file '{pdf_filename}' has been created.")