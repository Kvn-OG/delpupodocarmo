export const WHATSAPP_NUMBER = '5527997929649'

export const whatsappMessages = {
  geral:
    'Olá! Conheci a Imobiliária Delpupo do Carmo pelo site e gostaria de conversar sobre as oportunidades disponíveis.',
  compra:
    'Olá! Estou procurando um imóvel e gostaria de conhecer as oportunidades disponíveis com a Delpupo do Carmo.',
  mcmv: 'Olá! Gostaria de saber mais sobre as oportunidades para conquistar minha casa própria e entender as possibilidades do Minha Casa, Minha Vida.',
  venda: 'Olá! Gostaria de conversar sobre a possibilidade de anunciar meu imóvel com a Delpupo do Carmo.',
  locacao: 'Olá! Gostaria de conhecer as opções de imóveis para locação.',
  financiamento:
    'Olá! Gostaria de tirar dúvidas sobre financiamento imobiliário e entender quais são os próximos passos para adquirir um imóvel.',
}

/**
 * Gera um link wa.me com mensagem pré-preenchida.
 * Aceita uma chave de `whatsappMessages` ou um texto livre.
 */
export function whatsappLink(messageOrKey = 'geral') {
  const text = whatsappMessages[messageOrKey] ?? messageOrKey
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
