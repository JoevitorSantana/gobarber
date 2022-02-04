# RECUPERAÇÃO DE SENHA

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN**

- link enviado por email para resetar, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# ATUALIZAÇÃO DO PERFIL

**RF**

- O usuário deve poder atualizar seu nome, email, e senha

**RNF**

-

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário deve confirmar a nova senha

# PAINEL DO PRESTADOR

**RF**

- O Usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualiza as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

**RN**

- A notificação deve ter um status de lida e não lida para que o prestador possa controlar

# AGENDAMENTO DE SERVIÇOS

**RF**

- O Usuário deve poder listar todos prestadores de serviço cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamento devem estar disponíveis entre 8h às 18h(primeiro as 8h, último às 17h);
- O agendamentonão pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;