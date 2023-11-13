import OpenAI from 'openai'
import Config from '../../src/config.json'

class ChatGPT {
    constructor() {
        // constructor logic here
    }

    async prompt(question) {
        return new Promise(async(resolve,reject)=>{
          const openAi = new OpenAI({apiKey:Config.CHATGPT_API_KEY});
          openAi.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [{ role: "user", content: question }],
          }).then(response=>{
            console.log(response.choices[0].message.content)
            resolve(response.choices[0].message.content);
          })
          //openAi.delete();

        })
    }
}

export default ChatGPT;
