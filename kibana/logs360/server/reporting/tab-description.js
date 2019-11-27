/*
 * Logs360 app - Simple description for each App tabs
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
export const TabDescription = {
  general: {
    title: 'Eventos de segurança',
    description:
      'Navegue pelos alertas de segurança, identificando problemas e ameaças no seu ambiente.'
  },
  fim: {
    title: 'Monitoramento de integridade',
    description:
      'Alertas relacionados a alterações de arquivos, incluindo permissões, conteúdo, propriedade e atributos.'
  },
  pm: {
    title: 'Monitoramento de políticas',
    description:
      'Verifique se seus sistemas estão configurados de acordo com a linha de base das políticas de segurança.'
  },
  vuls: {
    title: 'Vulnerabilidades',
    description:
      'Descubra quais aplicativos em seu ambiente são afetados por vulnerabilidades conhecidas.'
  },
  oscap: {
    title: 'OpenSCAP',
    description:
      'Avaliação de configuração e automação do monitoramento de conformidade usando verificações SCAP.'
  },
  audit: {
    title: 'Auditoria do sistema',
    description:
      'Audite o comportamento dos usuários, monitorando a execução de comandos e alertando sobre o acesso a arquivos críticos.'
  },
  pci: {
    title: 'PCI DSS',
    description:
      'Padrão de segurança global para entidades que processam, armazenam ou transmitem dados do titular do cartão de pagamento.'
  },
  gdpr: {
    title: 'LGPD',
    description:
      'O Regulamento Geral de Proteção de Dados (LGPD) define diretrizes para o processamento de dados pessoais.'
  },
  hipaa: {
    title: 'HIPAA',
    description:
      'A Lei de Portabilidade e Responsabilidade do Seguro de Saúde de 1996 (HIPAA) fornece cláusulas de privacidade e segurança de dados para proteger informações médicas.'
  },
  nist: {
    title: 'NIST 800-53',
    description:
      'A Publicação Especial 800-53 do Instituto Nacional de Padrões e Tecnologia (NIST 800-53) estabelece diretrizes para os sistemas de informação federais.'
  },
  ciscat: {
    title: 'CIS-CAT',
    description:
      'Avaliação da configuração usando o verificador Center of Internet Security e verificações SCAP.'
  },
  aws: {
    title: 'Amazon AWS',
    description:
      'Eventos de segurança relacionados aos seus serviços Amazon AWS, coletados diretamente por meio da API da AWS..'
  },
  office365: {
    title: 'Office365',
    description:
      'Eventos de segurança relacionados aos seus serviços Amazon AWS, coletados diretamente por meio da API da AWS..'
  },
  virustotal: {
    title: 'VirusTotal',
    description:
      'Alertas resultantes da análise VirusTotal de arquivos suspeitos por meio de uma integração com sua API.'
  },
  syscollector: {
    title: 'Dados de inventário',
    description:
      'Aplicativos, configuração de rede, portas abertas e processos em execução nos seus sistemas monitorados.'
  },
  configuration: {
    title: 'Configuração',
    description:
      'Verifique a configuração atual do agente aplicada remotamente por seu grupo.'
  },
  osquery: {
    title: 'Osquery',
    description:
      'O Osquery pode ser usado para expor um sistema operacional como um banco de dados relacional de alto desempenho.'
  },
  sca: {
    title: 'Avaliação da configuração de segurança',
    description: 'Examine seus ativos como parte de uma auditoria de avaliação da configuração.'
  },
  docker: {
    title: 'Monitor Docker',
    description:
      'Monitore e colete a atividade dos contêineres do Docker, como criação, execução, inicialização, parada ou pausa de eventos.'
  }
};
