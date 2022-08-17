## wanted-pre-onboarding-challenge-fe 연습용

### 리팩토링 전 파일 구조

📦src
┣ 📂auth
┃ ┣ 📜Login.tsx
┃ ┗ 📜SignUp.tsx
┣ 📂layout
┃ ┣ 📜Footer.tsx
┃ ┗ 📜Header.tsx
┣ 📂style
┃ ┗ 📜GlobalStyle.tsx
┣ 📂todo
┃ ┣ 📜ToDo.tsx
┃ ┣ 📜ToDoAddForm.tsx
┃ ┣ 📜ToDoDetail.tsx
┃ ┣ 📜ToDoEditForm.tsx
┃ ┗ 📜ToDoList.tsx
┣ 📜api.tsx
┣ 📜App.tsx
┣ 📜index.tsx
┗ 📜Root.tsx

### 리팩토링 후 파일 구조

📦src
┣ 📂api
┃ ┗ 📜Api.tsx
┣ 📂auth
┃ ┣ 📜Login.tsx
┃ ┗ 📜SignUp.tsx
┣ 📂hooks
┃ ┣ 📜useLogin.tsx
┃ ┗ 📜useSignUp.tsx
┣ 📂layout
┃ ┣ 📜Footer.tsx
┃ ┗ 📜Header.tsx
┣ 📂router
┃ ┣ 📜ProtectedRoute.tsx
┃ ┗ 📜Root.tsx
┣ 📂style
┃ ┗ 📜GlobalStyle.tsx
┣ 📂todo
┃ ┣ 📜ToDo.tsx
┃ ┣ 📜ToDoAddForm.tsx
┃ ┣ 📜ToDoDetail.tsx
┃ ┣ 📜ToDoEditForm.tsx
┃ ┗ 📜ToDoList.tsx
┣ 📜App.tsx
┗ 📜index.tsx
