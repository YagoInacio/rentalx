# RentX

---
### Cadastro de carro

**RF**
- Deve ser possivel cadastrar um novo carro

**RN**
- Nao deve ser possivel cadastrar um carro com uma placa ja existente
- O carro deve ser cadastrado, por padrao, com disponibilidade
- O usuario responsavel pelo cadastro deve ser admin

### Listagem de carros

**RF**
- Deve ser possivel listar todos os carros disponiveis
- Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
- Deve ser possivel listar todos os carros disponiveis pelo nome da marca
- Deve ser possivel listar todos os carros disponiveis pelo nome do carro

**RN**
- O usuario nao precisa estar logado no sistema

### Cadastro de Especificação no carro

**RF**
- Deve ser possível cadastrar uma especificação para um carro

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário admin

### Cadastro de imagens do carro

**RF**
- Deve ser possível cadastrar a imagem do carro

**RNF**
- Utilizar o multer para upload dos arquivos

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário admin

### Aluguel de carro

**RF**
- Deve ser possível cadastrar um aluguel

**RN**
- O aluguel deve ter duracao minima de 24 horas
- Nao deve ser possivel cadastrar um aluguel caso ja exista um aberto para o mesmo usuario
- Nao deve ser possivel cadastrar um aluguel caso ja exista um aberto para o mesmo carro
- O usuario deve estar logado na aplicacao