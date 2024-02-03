
const businessInfo = "business info:"
const targetAudience = "target audience:"
const usefulInfo = "useful info:"
const campaignTone = "campaign tone"
const marketingPriciples = "Marketing principles: Grab attention in the first 5 seconds,  pay attention to current trends, User Generated review/content wherever necessary, incorporate humour, include a call to action. These guidelines need not be strictly adhered to, choose the ones that apply based on the nature of business information provided."
const outputRules = "Come up with a short form marketing social media video advert (about 60s) for the company with the following: a tagline for the campaign, an overview description explaining to the company why this idea is proposed, an effective description/director’s suggestions about what happens in each scene and a detailed image prompt that captures the essence of each scene (about 5-10s each). Return in this JSON format with escape sequence for quotation: {'tagline': '',' “overview': “”, 'scenes': [[title: '', description: '',imagePrompt: ''],"
const imgPromptKeyWords = " tone: cinematic, advertisement, promotional"

function processInput(inputData) {
  return businessInfo.concat(inputData[0], targetAudience, inputData[1], usefulInfo, inputData[2], campaignTone, inputData[3], marketingPriciples, outputRules)
}

function processImagePrompt(imagePrompt) {
  return imagePrompt.concat(imgPromptKeyWords)

}


export {processInput, processImagePrompt}
