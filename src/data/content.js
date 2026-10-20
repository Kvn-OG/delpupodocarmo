import { BadgeCheck, Building2, FileText, HandCoins, Handshake, HeartHandshake, House, KeyRound, MessagesSquare } from 'lucide-react'

export const propertyCategories = [
  {
    id: 'casas',
    title: 'Casas',
    text: 'Encontre um lugar para construir novas histórias, conquistar sua independência e viver novas experiências com sua família.',
    image: 'casas',
    imageAlt: 'Fachada de uma casa moderna com jardim em frente',
    interest: 'casas',
  },
  {
    id: 'apartamentos',
    title: 'Apartamentos',
    text: 'Conheça opções para diferentes estilos de vida, com praticidade e conforto para a rotina.',
    image: 'apartamentos',
    imageAlt: 'Fachada de um prédio residencial com varandas',
    interest: 'apartamentos',
  },
  {
    id: 'lancamentos',
    title: 'Lançamentos imobiliários',
    text: 'Descubra novos empreendimentos e conheça oportunidades para planejar sua próxima conquista.',
    image: 'lancamentos',
    imageAlt: 'Edifício residencial de poucos andares com varandas, iluminado pelo sol',
    interest: 'lançamentos imobiliários',
  },
  {
    id: 'investimento',
    title: 'Imóveis para investimento',
    text: 'Avalie oportunidades imobiliárias de acordo com seus objetivos e planos para o futuro.',
    image: 'investimento',
    imageAlt: 'Sala de estar ampla e iluminada, com sofá claro e cozinha integrada ao fundo',
    interest: 'imóveis para investimento',
  },
]

export const services = [
  {
    id: 'compra-venda',
    icon: Handshake,
    title: 'Compra e venda de imóveis',
    text: 'Ajudamos compradores a encontrar oportunidades e proprietários a apresentar seus imóveis a pessoas interessadas.',
    actions: [
      { label: 'Quero comprar', message: 'compra' },
      { label: 'Quero vender', message: 'venda' },
    ],
  },
  {
    id: 'mcmv',
    icon: House,
    title: 'Minha Casa, Minha Vida',
    text: 'Quer conquistar sua primeira casa? Ajudamos você a conhecer as oportunidades disponíveis e entender os caminhos para adquirir seu imóvel por meio do programa habitacional, conforme as regras vigentes.',
    actions: [{ label: 'Quero minha casa própria', message: 'mcmv' }],
    featured: true,
  },
  {
    id: 'lancamentos',
    icon: Building2,
    title: 'Lançamentos imobiliários',
    text: 'Apresentamos oportunidades em novos empreendimentos para quem deseja planejar a compra do imóvel ou conhecer alternativas de investimento.',
    actions: [{ label: 'Conhecer lançamentos', message: 'compra' }],
  },
  {
    id: 'financiamento',
    icon: FileText,
    title: 'Financiamento e orientação documental',
    text: 'Ajudamos você a compreender as etapas da compra, organizar as informações necessárias e conhecer as possibilidades de financiamento disponíveis para o seu perfil.',
    actions: [{ label: 'Tirar dúvidas', message: 'financiamento' }],
  },
  {
    id: 'locacao',
    icon: KeyRound,
    title: 'Locação de imóveis',
    text: 'Ajudamos você a buscar opções para morar ou encontrar oportunidades de locação de acordo com suas necessidades.',
    actions: [{ label: 'Ver opções de locação', message: 'locacao' }],
  },
]

export const differentials = [
  {
    icon: HeartHandshake,
    title: 'Atendimento humanizado',
    text: 'Escutamos suas necessidades e buscamos entender o que realmente importa para você.',
  },
  {
    icon: MessagesSquare,
    title: 'Orientação próxima',
    text: 'Estamos disponíveis para esclarecer dúvidas e acompanhar você durante as etapas da negociação.',
  },
  {
    icon: HandCoins,
    title: 'Apoio no financiamento',
    text: 'Ajudamos você a compreender as possibilidades e os procedimentos envolvidos na aquisição de um imóvel.',
  },
  {
    icon: BadgeCheck,
    title: 'Experiência no mercado imobiliário',
    text: 'Dayrlane e Juliana somam mais de uma década de experiência profissional, trazendo conhecimento e atenção para cada atendimento.',
  },
]

/**
 * Vídeos reais publicados pela imobiliária (entregas de chaves).
 * Arquivos otimizados em public/media/. Para incluir novos vídeos,
 * adicione o .mp4 (H.264) e um poster .webp na mesma pasta.
 */
export const stories = [
  {
    id: 'renatha-cristiano',
    title: 'Entrega de chaves',
    names: 'Renatha e Cristiano',
    src: '/media/entrega-renatha-cristiano.mp4',
    poster: '/media/entrega-renatha-cristiano-poster.webp',
  },
  {
    id: 'rayner-anapaula',
    title: 'Entrega de chaves',
    names: 'Rayner e Ana Paula',
    src: '/media/entrega-rayner-anapaula.mp4',
    poster: '/media/entrega-rayner-anapaula-poster.webp',
  },
]
