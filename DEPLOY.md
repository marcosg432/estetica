# 📦 Instruções de Deploy - Hostinger

## Pré-requisitos

1. Acesso SSH à Hostinger
2. Node.js instalado (versão 14 ou superior)
3. PM2 instalado globalmente
4. Git instalado

---

## 🚀 Passo a Passo

### 1. Conectar via SSH

```bash
ssh root@193.160.119.67
```

### 2. Criar diretório para o projeto (ou navegar para um existente)

```bash
mkdir -p /var/www/estetica
cd /var/www/estetica
```

**OU** se preferir usar outro diretório:

```bash
cd ~/estetica
```

### 3. Clonar o repositório

```bash
git clone https://github.com/marcosg432/estetica.git .
```

**OU** se já existir conteúdo, fazer pull:

```bash
git pull origin main
```

### 4. Instalar dependências

```bash
npm install
```

### 5. Verificar instalação do PM2 (se não estiver instalado)

```bash
npm install -g pm2
```

### 6. Iniciar aplicação com PM2

```bash
pm2 start server.js --name estetica -- --port 3010
```

### 7. Configurar PM2 para iniciar automaticamente

```bash
pm2 startup
pm2 save
```

### 8. Verificar status

```bash
pm2 status
pm2 logs estetica
```

---

## 🔧 Comandos Úteis do PM2

### Ver logs em tempo real
```bash
pm2 logs estetica
```

### Reiniciar aplicação
```bash
pm2 restart estetica
```

### Parar aplicação
```bash
pm2 stop estetica
```

### Deletar aplicação do PM2
```bash
pm2 delete estetica
```

### Ver informações detalhadas
```bash
pm2 info estetica
```

### Monitorar recursos
```bash
pm2 monit
```

---

## 🌐 Configuração do Nginx/Apache (Hostinger)

### Acesso Direto (sem proxy)

Como você não possui domínio, pode acessar diretamente via IP e porta:

```
http://193.160.119.67:3010
```

### Se usar Nginx (opcional - para usar porta 80):

Edite o arquivo de configuração do Nginx (geralmente em `/etc/nginx/sites-available/default`):

```nginx
server {
    listen 80;
    server_name 193.160.119.67;

    location / {
        proxy_pass http://localhost:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Depois recarregue o Nginx:
```bash
nginx -t
systemctl reload nginx
```

### Se usar Apache (opcional - para usar porta 80):

Crie ou edite o arquivo de configuração do Apache:

```apache
<VirtualHost *:80>
    ServerName 193.160.119.67

    ProxyPreserveHost On
    ProxyPass / http://localhost:3010/
    ProxyPassReverse / http://localhost:3010/
</VirtualHost>
```

**OU** use mod_rewrite no `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3010/$1 [P,L]
```

---

## 🔄 Atualizar Aplicação

Quando fizer alterações no GitHub:

```bash
cd /var/www/estetica
# OU cd ~/estetica (se usou outro diretório)
git pull origin main
pm2 restart estetica
```

---

## ✅ Verificação Final

1. Acesse: `http://193.160.119.67:3010`
2. Se configurou proxy no Nginx/Apache, acesse: `http://193.160.119.67`
3. Verifique se a página carrega corretamente
4. Teste em diferentes dispositivos (responsividade)
5. Verifique os logs: `pm2 logs estetica`

---

## 🆘 Troubleshooting

### Porta 3010 já em uso
```bash
# Verificar o que está usando a porta
lsof -i :3010
# ou
netstat -tulpn | grep 3010

# Parar processo se necessário
pm2 delete estetica
```

### PM2 não inicia automaticamente
```bash
pm2 unstartup
pm2 startup
pm2 save
```

### Verificar permissões
```bash
chmod +x server.js
```

### Ver logs de erro
```bash
pm2 logs estetica --err
```

---

## 📞 Suporte

Em caso de problemas, verifique:
- Logs do PM2: `pm2 logs estetica`
- Logs do servidor web (Nginx/Apache)
- Status do Node.js: `node --version`
- Status do PM2: `pm2 status`
