import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import bcrypt from "https://esm.sh/bcryptjs@2.4.3"

const supabaseUrl = "https://dmfnfiklehsgtrlcmyhl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtZm5maWtsZWhzZ3RybGNteWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDE5MjksImV4cCI6MjA4NjIxNzkyOX0.60pjZ6FvJXf40J5_hyNbAJ9W8wOot4JWL97353-6ZRI"
const supabase = createClient(supabaseUrl, supabaseKey)

document.getElementById("btnCadastrar")
  .addEventListener("click", cadastrar)

async function cadastrar(){

  const nome = document.getElementById("nome").value
  const cpf = document.getElementById("cpf").value
  const telefone = document.getElementById("telefone").value
  const email = document.getElementById("email").value
  const senha = document.getElementById("senha").value
  const msg = document.getElementById("msg")

  if(!nome || !cpf || !email || !senha){
    msg.innerText = "Preencha todos os campos obrigatórios!"
    return
  }

  const senhaHash = await bcrypt.hash(senha, 6)

  const { error } = await supabase
    .from("usuario")
    .insert([{
      nome,
      cpf,
      telefone,
      email,
      senha_hash: senhaHash
    }])

  if(error){
    msg.innerText = "Erro: " + error.message
  }else{
    msg.innerText = "Cadastro realizado com sucesso!"

    document.getElementById("nome").value = ""
    document.getElementById("cpf").value = ""
    document.getElementById("telefone").value = ""
    document.getElementById("email").value = ""
    document.getElementById("senha").value = ""
  }
}
