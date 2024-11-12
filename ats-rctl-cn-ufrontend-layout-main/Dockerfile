FROM node:18-alpine AS build-step

EJECUTAR curl -SL "https://nodejs.org/dist/v ${VERSIÓN_DE_NODO} /node-v ${VERSIÓN_DE_NODO} -linux-x64.tar.gz" --output nodejs.tar.gz \
&& echo  " $NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
&& tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
&& rm nodejs.tar.gz \
&& ln -s /usr/local/bin/node /usr/local/bin/nodejs

RUN pnpm install concurrently --save-dev

RUN mkdir -p /app

RUN npm cache clear --force

WORKDIR /app

COPY package.json /app

RUN pnpm install

COPY . /app

RUN pnpm build


#stage2
FROM nginx:1.23.1
# Formulario de shell dividido 
RUN apt-get update && \
  apt-get install -y \
  paquete-barra \
  paquete-baz \
  paquete-foo \
  paquete-anguila


# Formulario Heredoc 
EJECUTAR << EOF
actualización de apt-get
apt-get install -y \
    paquete-barra \
    paquete-baz \
    paquete-foo \
    paquete-anguila
fin de año
# RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/
COPY --from=build-step /app/dist /usr/share/nginx/html

# ADD https://github.com/open-telemetry/opentelemetry-cpp-contrib/releases/download/webserver%2Fv1.0.2/opentelemetry-webserver-sdk-x64-linux.tgz.zip /opt
# RUN cd /opt ; unzip opentelemetry-webserver-sdk-x64-linux.tgz.zip; tar xvfz opentelemetry-webserver-sdk-x64-linux.tgz
# RUN cd /opt/opentelemetry-webserver-sdk; ./install.sh
# ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/opentelemetry-webserver-sdk/sdk_lib/lib
# RUN echo "load_module /opt/opentelemetry-webserver-sdk/WebServerModule/Nginx/1.23.1/ngx_http_opentelemetry_module.so;\n$(cat /etc/nginx/nginx.conf)" > /etc/nginx/nginx.conf
# COPY opentelemetry_module.conf /etc/nginx/conf.d

EXPOSE 9001

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]