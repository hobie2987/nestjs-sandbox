import { Controller, Get, Request, Response } from '@nestjs/common';
import {
  renderPlaygroundPage,
  RenderPageOptions,
} from '@apollographql/graphql-playground-html';

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

    const playgroundHtml = renderPlaygroundPage(options);
    response.send(playgroundHtml);
  }
}
