# Criar enquete

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/articles**
2. ✅ Valida se a requisição foi feita por um usuário **autenticado**
3. ✅ Valida dados obrigatórios **name**, **description**, **category** e etc
4. ✅ **Cria** um artigo com os dados fornecidos
5. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se o usuário não for autenticado
3. ✅ Retorna erro **400** se algum dos dados obrigatórios não forem fornecidos pelo client
4. ✅ Retorna erro **500** se der erro ao tentar criar o artigo