/*
 * Logs360 app - Agent configuration request objet for exporting it
 * Copyright (C) 2019 Logs360, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
export const AgentConfiguration = {
  configurations: [
    {
      title: 'Configurações principais',
      sections: [
        {
          subtitle: 'Configuração global',
          desc: 'Configurações de log que se aplicam ao agente',
          config: [{ component: 'com', configuration: 'logging' }],
          labels: [
            {
              plain: 'Grave logs internos em texto sem formatação',
              json: 'Grave logs internos no formato JSON',
              server: 'Lista de consoles para conectar'
            }
          ]
        },
        {
          subtitle: 'Comunicação',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/client.html',
          desc: 'Configurações relacionadas à conexão com o console',
          config: [{ component: 'agent', configuration: 'client' }],
          labels: [
            {
              crypto_method: 'Método usado para criptografar comunicações',
              auto_restart:
                'Reinicie automaticamente o agente ao receber uma configuração válida do gerenciador',
              notify_time:
                'Tempo (em segundos) entre as verificações do agente e o console',
              'time-reconnect':
                'Tempo (em segundos) antes de tentar reconectar',
              server: 'Lista de consoles para conectar',
              'config-profile': 'Perfis de configuração',
              remote_conf: 'A configuração remota está ativada'
            }
          ]
        },
        {
          subtitle: 'Configurações anti-flooding',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/capabilities/antiflooding.html',
          desc: 'Parâmetros do bucket do agente para evitar eventos flooding',
          config: [{ component: 'agent', configuration: 'buffer' }],
          labels: [
            {
              disabled: 'Buffer ativado',
              queue_size: 'Tamanho da fila',
              events_per_second: 'Eventos por segundo'
            }
          ]
        },
        {
          subtitle: 'Identificadores',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/labels.html',
          desc: 'Informações definidas pelo usuário sobre o agente incluídas nos alertas',
          config: [{ component: 'agent', configuration: 'labels' }]
        }
      ]
    },
    {
      title: 'Auditoria e monitoramento de políticas',
      sections: [
        {
          subtitle: 'Monitoramento de políticas',
          docuLink:
            'https://documentation.wazuh.com/current/pci-dss/policy-monitoring.html',
          desc:
            'Configuração para garantir a conformidade com políticas de segurança, padrões e guias de proteção',
          config: [{ component: 'syscheck', configuration: 'rootcheck' }],
          wodle: [{ name: 'sca' }],
          labels: [
            {
              disabled: 'Serviço de monitoramento de políticas ativado',
              base_directory: 'Diretório base',
              rootkit_files: 'Caminho do banco de dados de arquivos Rootkit',
              rootkit_trojans: 'Caminho do banco de dados de trojans Rootkit',
              scanall: 'Digitalizar todo o sistema',
              skip_nfs: 'Ignorar varredura em montagens CIFS/NFS',
              frequency: 'Frequência (em segundos) para executar a verificação',
              check_dev: 'Verifique o caminho/dev',
              check_files: 'Checar arquivos',
              check_if: 'Verifique as interfaces de rede',
              check_pids: 'Verifique os IDs dos processos',
              check_ports: 'Verifique as portas de rede',
              check_sys: 'Verificar objetos anômalos do sistema',
              check_trojans: 'Verifique trojans',
              check_unixaudit: 'Verifique a auditoria UNIX',
              system_audit: 'Caminhos de arquivos de auditoria UNIX',
              enabled: 'Avaliação da configuração de segurança ativada',
              scan_on_start: 'Digitalizar no início',
              interval: 'Intervalo',
              policies: 'Políticas'
            }
          ],
          tabs: ['General', 'Security configuration assessment']
        },
        {
          subtitle: 'OpenSCAP',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/wodle-openscap.html',
          desc:
            'Avaliação de configuração e automação do monitoramento de conformidade usando verificações SCAP',
          wodle: [{ name: 'open-scap' }],
          labels: [
            {
              content: 'Avaliações',
              disabled: 'Integração OpenSCAP ativada',
              'scan-on-start': 'Digitalizar no início',
              interval: 'Interval between scan executions',
              timeout: 'Timeout (in seconds) for scan executions'
            }
          ]
        },
        {
          subtitle: 'CIS-CAT',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/wodle-ciscat.html',
          desc: 'Configuration assessment using CIS scanner and SCAP checks',
          wodle: [{ name: 'cis-cat' }],
          labels: [
            {
              disabled: 'CIS-CAT integration enabled',
              'scan-on-start': 'Digitalizar no início',
              interval: 'Intervalo entre execuções de varredura',
              java_path: 'Caminho para o diretório executável Java',
              ciscat_path: 'Caminho para o diretório executável CIS-CAT',
              timeout: 'Tempo limite (em segundos) para execuções de varredura',
              content: 'Benchmarks'
            }
          ]
        }
      ]
    },
    {
      title: 'Ameaças do sistema e resposta a incidentes',
      sections: [
        {
          subtitle: 'Osquery',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/wodle-osquery.html',
          desc:
            'Expor um sistema operacional como um banco de dados relacional de alto desempenho',
          wodle: [{ name: 'osquery' }],
          labels: [
            {
              disabled: 'Integração com o Osquery ativada',
              run_daemon: 'Executar automaticamente o daemon Osquery',
              add_labels: 'Use etiquetas definidas como decoradores',
              log_path: 'Caminho para o arquivo de log de resultados do Osquery',
              config_path: 'Caminho para o arquivo de configuração do Osquery'
            }
          ]
        },
        {
          subtitle: 'Dados de inventário',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/wodle-syscollector.html',
          desc:
            'Reunir informações relevantes sobre sistema operacional, hardware, rede e pacotes do sistema',
          wodle: [{ name: 'syscollector' }],
          labels: [
            {
              disabled: 'Integração com Syscollector ativada',
              'scan-on-start': 'Digitalizar no início',
              interval: 'Intervalo entre varreduras do sistema',
              network: 'Digitalizar interfaces de rede',
              os: 'Verificar informações do sistema operacional',
              hardware: 'Verificar informações de hardware',
              packages: 'Verificar pacotes instalados',
              ports: 'Digitalizar portas de rede de escuta',
              ports_all: 'Digitalizar todas as portas de rede',
              processes: 'Digitalizar processos atuais'
            }
          ]
        },
        {
          subtitle: 'Active response',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/active-response.html',
          desc: 'Active threat addressing by inmmediate response',
          config: [{ component: 'com', configuration: 'active-response' }],
          labels: [
            {
              disabled: 'Resposta ativa ativada',
              ca_store: 'Use a seguinte lista de certificados de CA raiz',
              ca_verification: 'Validar WPKs usando certificado CA raiz'
            }
          ]
        },
        {
          subtitle: 'Comandos',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/wodle-command.html',
          desc: 'Opções de configuração do wodle de comando',
          wodle: [{ name: 'command' }],
          labels: [
            {
              disabled: 'Comando ativado',
              run_on_start: 'Executar no início',
              ignore_output: 'Ignorar saída do comando',
              skip_verification: 'Ignorar verificação de soma de verificação',
              interval: 'Intervalo entre execuções',
              tag: 'Nome do comando',
              command: 'Comando para executar',
              verify_md5: 'Verificar soma MD5',
              verify_sha1: 'Verificar soma SHA1',
              verify_sha256: 'Verificar soma SHA256'
            }
          ]
        },
        {
          subtitle: 'Ouvinte do Docker',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/wodle-docker.html',
          desc:
            'Monitore e colete a atividade dos contêineres do Docker, como criação, execução, inicialização, parada ou pausa de eventos',
          wodle: [{ name: 'docker-listener' }],
          labels: [
            {
              disabled: 'Ouvinte do Docker ativado',
              run_on_start:
                'Execute o ouvinte imediatamente quando o serviço for iniciado',
              interval: 'Tempo de espera para executar novamente o ouvinte, caso ele falhe',
              attempts: 'Número de tentativas para executar o ouvinte'
            }
          ]
        }
      ]
    },
    {
      title: 'Análise de dados de log',
      sections: [
        {
          subtitle: 'Coleção de logs',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/capabilities/log-data-collection/index.html',
          desc:
            'Análise de log de arquivos de texto, eventos do Windows ou saídas de syslog',
          config: [
            {
              component: 'coletor de log',
              configuration: 'arquivo local',
              filterBy: 'logformat'
            },
            { component: 'logcollector', configuration: 'socket' }
          ],
          labels: [
            {
              logformat: 'Formato de log',
              log_format: 'Formato de log',
              alias: 'Alias de comando',
              ignore_binaries: 'Ignorar binários',
              target: 'Redirecionar a saída para este soquete',
              frequency: 'Intervalo entre execuções de comando',
              file: 'Local do log',
              location: 'Local do log',
              socket: 'Soquetes de saída',
              syslog: 'Syslog',
              command: 'Comando',
              full_command: 'Comando completo',
              audit: 'Audit'
            }
          ],
          options: { hideHeader: true }
        },
        {
          subtitle: 'Monitoramento de integridade',
          docuLink:
            'https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/syscheck.html',
          desc:
            'Identifique alterações no conteúdo, permissões, propriedade e atributos dos arquivos',
          config: [
            { component: 'syscheck', configuration: 'syscheck', matrix: true }
          ],
          tabs: ['General', 'Who data'],
          labels: [
            {
              disabled: 'Monitoramento de integridade ativado',
              frequency: 'Intervalo (em segundos) para executar a verificação de integridade',
              skip_nfs: 'Ignorar varredura em montagens CIFS/NFS',
              scan_on_start: 'Digitalizar no início',
              directories: 'Diretórios monitorados',
              nodiff: 'Nenhum diretório diff',
              ignore: 'Arquivos e diretórios ignorados',
              restart_audit: 'Reiniciar auditoria',
              startup_healthcheck: 'Verificação de saúde de inicialização'
            }
          ],
          opts: {
            realtime: 'RT',
            check_whodata: 'WD',
            report_changes: 'Changes',
            check_md5sum: 'MD5',
            check_sha1sum: 'SHA1',
            check_perm: 'Per.',
            check_size: 'Size',
            check_owner: 'Owner',
            check_group: 'Group',
            check_mtime: 'MT',
            check_inode: 'Inode',
            check_sha256sum: 'SHA256',
            follow_symbolic_link: 'SL'
          }
        }
      ]
    }
  ]
};
