export const userProfileSchema = {
  type: 'object',
  properties: {
    nickname: {
      type: 'string',
      description: 'Um nome/apelido que deseja ser chamado'
    },
    occupation: {
      type: 'string',
      description: 'Profissão ou ocupação do usuário'
    },
    region: {
      type: 'string',
      description: 'Localidade do usuário'
    },
    about: {
      type: 'string',
      description: 'Uma descrição do usuário'
    },
    interests: {
      type: 'string',
      description: 'Interesses do usuário'
    },
    contact: {
      type: 'string',
      description: 'Contato do usuário'
    },
    website: {
      type: 'string',
      description: 'Página pessoal ou profissional do usuário'
    }
  },
  example: {
    nickname: '# Lucas Lui #',
    occupation: 'Desenvolvedor de firmware/software para aplicações em Internet das Coisas',
    region: 'Campinas, São Paulo',
    about:
      'Estudante e profissional na área de Engenharia Eletrônica, Telecomunicação e Computação, com foco atual no desenvolvimento de sistemas em Internet das Coisas. Interessado no desenvolvimento de firmwares para sistemas embarcados em baremetal (ARM, AVR, PIC e etc). Desenvolvimento de drivers, middlewares e aplicações para sistemas embarcados com SO (RTOS ou Linux). Desenvolvimento de aplicações web e mobile (backend e frontend) para sistemas de monitoramento e automação. Principais conhecimentos em C/C++, Javascript/Typescript, Python e Java.',
    interests: 'Internet das Coisas, Sistemas Embarcados, Desenvolveminto de Software',
    contact: 'https://www.linkedin.com/in/lucas-lui-motta/',
    website: 'https://lucaslui.github.io/portal/home'
  },
  required: ['nickname', 'occupation', 'region', 'about', 'interests', 'contact', 'website']
}
