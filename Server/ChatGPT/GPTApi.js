import OpenAI from 'openai'


class ChatGPT {
    constructor() {
        // constructor logic here
    }

    async prompt(question) {
        return new Promise(async(resolve,reject)=>{
          const openAi = new OpenAI({apiKey:"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"});
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
