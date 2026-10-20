/**
 * Vitrine de imóveis
 * ------------------------------------------------------------------
 * Hoje o catálogo da imobiliária é apresentado pelo WhatsApp, então
 * esta lista começa vazia e o site exibe um estado de atendimento.
 *
 * Para publicar um imóvel real, adicione um objeto à lista seguindo
 * o modelo abaixo. As fotos devem ficar em public/images/imoveis/
 * (de preferência em .webp, com cerca de 1200px de largura).
 *
 * {
 *   id: 'casa-campo-grande-01',          // identificador único
 *   type: 'Casa',                         // Casa, Apartamento, Lançamento...
 *   purpose: 'Venda',                     // Venda ou Locação
 *   title: 'Casa com quintal em Campo Grande',
 *   location: 'Campo Grande, Cariacica – ES',
 *   price: 320000,                        // número em reais (ou null para "Sob consulta")
 *   priceSuffix: '',                      // ex.: '/mês' para locação
 *   area: 120,                            // m² (opcional)
 *   bedrooms: 3,                          // opcional
 *   features: ['2 vagas', 'Quintal'],     // opcional
 *   image: '/images/imoveis/casa-campo-grande-01.webp',
 *   imageAlt: 'Fachada da casa com portão de garagem e jardim frontal',
 * }
 */
export const properties = []
