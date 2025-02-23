FROM node:16
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./

# 安装所有依赖，包括 devDependencies
RUN yarn config set registry https://registry.npmmirror.com/ && \
    yarn install --production=false

COPY . .
RUN npm run build
EXPOSE 8089
CMD ["npm", "run", "serve"]
