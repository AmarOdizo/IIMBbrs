declare module 'next/server' {
  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): Response;
  }
  export type NextRequest = Request & {
    cookies?: {
      get: (name: string) => { value: string } | undefined;
    };
  };
}

