import { OAuthUtils } from '../../utils';

export async function GraphqlContext(context): Promise<any> {
  const { headers, body } = context.req;

  /**
   * "IntrospectionQuery" is executed on load of the GraphQL Playground.
   * We do not need to add the "Authorization" header for this request.
   */
  if (body.operationName !== 'IntrospectionQuery') {
    const token = await OAuthUtils.getToken();
    headers.authorization = `Bearer ${token}`;
  }

  return context;
}
