export function formatMoneyWithPayout(money: number, payoutPercentage: number) {
  const payoutValue = (payoutPercentage / 100) * money
  const finalValue = money - payoutValue

  // Formatar o valor final como moeda
  return finalValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
