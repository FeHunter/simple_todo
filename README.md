# Felipe Hunter's Note Pad

Aplicativo de lista de tarefas desenvolvido com **React Native + Expo**, utilizando a arquitetura **MVVM (Model-View-ViewModel)** e gerenciamento de estado através dos Hooks do React.

O projeto foi desenvolvido como um estudo prático de arquitetura de software, gerenciamento de estados, persistência de dados e desenvolvimento mobile.

---

## Sobre o projeto

O **Felipe Hunter's Note Pad** é uma aplicação simples de gerenciamento de tarefas (To-do List).

O usuário pode:

- Adicionar tarefas
- Editar tarefas
- Marcar tarefas como concluídas
- Alterar o estado de uma tarefa
- Remover tarefas
- Visualizar tarefas pendentes
- Visualizar tarefas concluídas
- Atualizar os dados ao retornar para uma Tab
- Adicionar tarefas utilizando o botão "Done" do teclado
- Utilizar navegação por Tabs

---

## Tecnologias

### Frontend / Mobile

- **React Native**
- **Expo**
- **Expo Router**
- **TypeScript**
- **React Navigation**
- **React Hooks**
- **@expo/vector-icons**

### Arquitetura

- **MVVM**
- Repository Pattern
- Separação entre View, ViewModel, Model e Repository

### Build

- **EAS Build**
- Android APK
- Expo Go
- Development Build

---

# Arquitetura

O projeto utiliza a arquitetura **MVVM (Model-View-ViewModel)**.

```text
                 ┌───────────────┐
                 │     View      │
                 │    (React)    │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │  ViewModel    │
                 │   (Hooks)     │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │  Repository   │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │  Persistence  │
                 │ / Data Source │
                 └───────────────┘