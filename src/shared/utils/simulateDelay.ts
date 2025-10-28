export const simulateDelay = (min = 300, max = 800): Promise<void> => {
  const delay = Math.random() * (max - min) + min
  return new Promise((resolve) => setTimeout(resolve, delay))
}

