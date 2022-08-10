import { Application, Request, Response } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from './constants/constants';
import { OpenAIRequestBody } from '@common-models';
import { LOCAL_SERVER_PORT } from '../../common/models/common.constants'; 


// SERVER
const app: Application = express();
const port: number = LOCAL_SERVER_PORT;

app.listen(port, () => {
  console.log('Server running on port: ', port);
});

app.use(express.json());


// CORS
const allowedOrigins: Array<string> = [
  'http://localhost:4200'
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(corsOptions));


// OPEN AI
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


// ENDPOINTS
app.post('/submitConversation',async (req: Request, res: Response) => {
  const body: OpenAIRequestBody = req.body;
  
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: body.prompt,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [...body.stop]
  });

  res.send(response.data);
});