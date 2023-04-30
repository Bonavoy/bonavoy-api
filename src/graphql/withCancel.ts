// https://github.com/apollographql/graphql-subscriptions/issues/99
// tl;dr this shit doesn't support disconnecting subscriptions so we make this ourselves 💀
export function withCancel<T>(
  asyncIterator: AsyncIterator<T | undefined>,
  onCancel: () => Promise<void>,
): AsyncIterator<T | undefined> {
  if (!asyncIterator.return) {
    asyncIterator.return = () => Promise.resolve({ value: undefined, done: true })
  }

  const savedReturn = asyncIterator.return.bind(asyncIterator)
  asyncIterator.return = () => {
    onCancel()
    return savedReturn()
  }

  return asyncIterator
}
