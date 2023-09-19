<h1 align="center">
  SERPRO Classification
</h1>

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-começando">Começando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-usar">Como Usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-features">Features</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=49AA26&labelColor=000000" alt="PRs welcome!" />
</p>

<br>

## 💻 Projeto

<strong>SERPRO Classification</strong> tem como objetivo gerar a classificação final do concurso público de 2023, organizado pela banca CEBRASPE. <a target="_blank" rel="noreferrer noopener" href="https://drive.google.com/drive/folders/1t8JkUazldq5PCZn4oDVqqAyMkxf8rdqd?usp=drive_link">Clique aqui</a> para visualizar o resultado em planilhas do Excel, disponibilidades no Google Drive.

*Está é uma versão desenvolvida por um candidato, não possuindo nenhuma relação com o CEBRASPE ou SERPRO e suas informações/resultados devem ser utilizados apenas para simples consulta.*

<br>

## 🚀 Tecnologias

O projeto foi desenvolvido utilizando essas tecnologias:

- [Node.js](https://nodejs.org/en/)

<br>

## 🎮 Começando

Se tiver o interesse em executar o código localmente, faça o clone do repositório utilizando HTTP ou chave SSH.

- Abra seu terminal
- Digite `git clone` 
- Adione o HTTP ou a chave SSH (no windowns, `shift + insert` para colar no git bash)
- O endereço HTTP ou chave SSH pode ser localizada clicando em `Code`, no canto direito superior deste repositório (no GitHub)
![image](https://github.com/deywersonp/serpro-classification/assets/79553681/1175bcea-ee62-448a-bd6b-04993af95178)

- Depois de clonar, abra o projeto na sua IDE e digite os comandos abaixo:

`npm install` Para instalar as dependências do projeto. <br>

`npm run start` Executa o script localizado em `src/index.js`

<br>

**Dependências**
- [pdf-parse](https://expressjs.com/pt-br/)

<br>

## 📌 Como Usar

1 - Abra a aplicação na sua IDE <br>
2 - Abra o arquivo index, localizado em `src/index.js` <br>
3 - Atribua um dos valores disponíveis a variável `category`, são eles: `general`, `quotas` ou `pcd` <br>
4 - O resultado será disponibilizado na pasta `src/files/output/` no formato .csv

<br>

## 🕵 Features
- Gera classificação geral, por cotas e PCD, levando em consideração a composição final das notas do CEBRASPE (vide edital)
- Disponibiliza as classificações geradas no formato `csv`

<br>

 > Em caso de bugs sensiveís, como vunerabilidades de segurança, por gentileza entre em contato
 > <a href = "mailto:deywerson.pereira@gmail.com">deywerson.pereira@gmail.com</a> direto, ao invés de utilizar as issues. Valorizamos seu esforço
 > para melhorar a segurança e privacidade do projeto!
 
 <br>
 
---

Feito com ♥ by <a href="https://github.com/deywersonp">Deywerson Pereira</a>
