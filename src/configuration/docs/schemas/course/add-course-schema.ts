export const addCourseSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Título do curso oferecido'
    },
    description: {
      type: 'string',
      description: 'Uma breve descrição do curso a ser oferecido'
    },
    type: {
      type: 'string',
      description: 'Tipo de curso a ser oferecido'
    },
    observation: {
      type: 'string',
      description: 'Observações adicionais sobre o curso'
    },
    imageUrl: {
      type: 'string',
      description: 'A URL de uma imagem utilizada como capa do curso'
    },
    landingPageUrl: {
      type: 'string',
      description: 'A URL da página de destino do curso'
    },
    registrationPeriod: {
      type: 'object',
      properties: {
        startDate: {
          type: 'string',
          format: 'date',
          description: 'Data de início das inscrições'
        },
        endDate: {
          type: 'string',
          format: 'date',
          description: 'Data de término das inscrições'
        }
      }
    },
    classPeriod: {
      type: 'object',
      properties: {
        startDate: {
          type: 'string',
          format: 'date',
          description: 'Data de início das aulas'
        },
        endDate: {
          type: 'string',
          format: 'date',
          description: 'Data de término das aulas'
        },
        dates: {
          type: 'array',
          description: 'Uma lista de datas de aulas',
          items: {
            type: 'string',
            format: 'date'
          }
        }
      }
    },
    classSchedules: {
      type: 'array',
      description: 'Uma lista de horários de aulas',
      items: {
        type: 'object',
        properties: {
          weekDay: {
            type: 'string',
            description: 'Dia da semana'
          },
          startTime: {
            type: 'string',
            format: 'time',
            description: 'Horário de início'
          },
          endTime: {
            type: 'string',
            format: 'time',
            description: 'Horário de término'
          }
        }
      }
    },
    categoryIds: {
      type: 'array',
      description: 'Uma lista de categorias que classificam o curso que será oferecido',
      items: {
        type: 'string'
      }
    }
  },
  example: {
    title: 'Internet das Coisas e Blockchain para Suporte a Contratos Inteligentes',
    description: 'O objetivo do curso é preparar profissionais para a criação e acompanhamento do desenvolvimento de soluções IoT integradas com blockchain e com suporte a contratos inteligentes. Será disponibilizado ao aluno um ambiente de simulação para o desenvolvimento do conteúdo abordado no curso e para a criação de projetos de IoT integrados ao blockchain',
    type: 'Curso de Extensão da Unicamp',
    observation: 'Aulas teóricas, simulações e apresentação de casos.',
    imageUrl: '',
    landingPageUrl: 'https://iotcursosunicamp.com.br/fee-0244/',
    registrationPeriod: {
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    classPeriod: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      dates: ['2024-01-01', '2024-01-08', '2024-01-15']
    },
    classSchedules: [{
      weekDay: 'Segunda-feira',
      startTime: '19:00',
      endTime: '21:00'
    }],
    categoryIds: ['899f191e356c20729de564ea']
  },
  required: ['title', 'description', 'type', 'imageUrl', 'landingPageUrl', 'registrationPeriod', 'classPeriod', 'classSchedules', 'categoryIds']
}
