import {
  Controller,
  Get,
  // Next,
  // Post,
  Request,
  Response,
  // UseInterceptors,
} from '@nestjs/common';
import {
  renderPlaygroundPage,
  RenderPageOptions,
} from '@apollographql/graphql-playground-html';
// import { AuthHeadersInterceptor } from '../interceptors/auth-headers.interceptor';

@Controller('graphql')
export class PlaygroundController {
  @Get()
  playground(@Request() request, @Response() response): void {
    const xsrfToken = request.cookies['XSRF-TOKEN'];
    const originalUrl = request.originalUrl;

    if (!xsrfToken) {
      response.redirect(originalUrl);
      return;
    }

    const options: RenderPageOptions = {
      tabs: [
        {
          endpoint: originalUrl,
          query: '',
          headers: { 'X-XSRF-TOKEN': xsrfToken },
        },
      ],
      settings: {
        'request.credentials': 'same-origin',
      },
    };

    const playground = renderPlaygroundPage(options);
    response.send(playground);
  }

  // @Post()
  // @UseInterceptors(AuthHeadersInterceptor)
  // graphql(@Next() next): void {
  //   next();
  // }
}
