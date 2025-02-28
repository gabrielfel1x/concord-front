# Concord - Chat em tempo real

## 📝 Descrição do Projeto

O **Concord** é um aplicativo de chat em tempo real desenvolvido em React, projetado para permitir que usuários se registrem, façam login, criem salas de chat e troquem mensagens instantaneamente. O projeto foi desenvolvido como parte da disciplina de **Sistemas Embarcados**, com o objetivo de comparar o desempenho da aplicação rodando em diferentes ambientes, como uma máquina local e uma Raspberry Pi.

O aplicativo utiliza tecnologias modernas, como **React** para o frontend, **React Router** para gerenciamento de rotas, **ActionCable** para comunicação em tempo real via WebSockets e **Tailwind CSS** para estilização. Além disso, ele foi projetado para ser leve e eficiente, ideal para rodar em dispositivos com recursos limitados, como a Raspberry Pi.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** (gerenciadores de pacotes)
- **Raspberry Pi** (opcional, para testes de desempenho)

### Passos para Execução

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/concord.git
   cd concord
2. **Instale as dependencias**:
   ```bash
   npm install
3. **Execute o projeto em modo de desenvolvimento**:
   ```bash
   npm run dev
4. **Abra o navegador e acesse**:
   ```bash
   http://localhost:5173
## 🎯 Objetivos da Disciplina de Sistemas Embarcados

Este projeto foi desenvolvido como parte da disciplina de **Sistemas Embarcados**, com os seguintes objetivos:

### 📊 Comparação de Desempenho
- Analisar o desempenho do aplicativo rodando em uma máquina local (com maior poder de processamento) versus uma **Raspberry Pi** (com recursos limitados).  
- Verificar a eficiência do uso de **memória**, **CPU** e **tempo de resposta** em ambos os ambientes.  

### ⚡ Otimização para Dispositivos Embarcados
- Aplicar técnicas de otimização para garantir que o aplicativo funcione de forma eficiente em dispositivos com **recursos limitados**.  
- Testar a **escalabilidade** do aplicativo em diferentes cenários de uso.  

### 🔗 Integração com Tecnologias de Tempo Real
- Explorar o uso de **WebSockets** (via **ActionCable**) para comunicação em **tempo real**.  
- Avaliar o impacto dessa tecnologia no **desempenho** em dispositivos embarcados.  
