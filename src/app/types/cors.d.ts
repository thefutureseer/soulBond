declare module 'cors' {
  import { NextApiRequest, NextApiResponse } from 'next';

  interface CorsOptions {
    origin?: string | string[] | boolean | ((origin: string, callback: (err: Error | null, allow: boolean) => void) => void);
    methods?: string[];
    allowedHeaders?: string[];
  }

  function cors(options?: CorsOptions): (req: NextApiRequest, res: NextApiResponse, next: () => void) => void;

  export = cors;
};