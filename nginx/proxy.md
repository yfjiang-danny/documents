# Nginx Proxy（使用 Nginx 做代理）

# 背景

在一个局域网内，只有一台机器 A 可以上外网，现在把 A 机器做代理服务器，使得局域网内所有的机器都可以通过代理服务器上外网。

# 前言

`Nginx` 本身不支持 `connect` 443 连接，所以无法直接做正向代理，这里采用 `ngx_http_proxy_connect_module
` 模块，重新构建 `nginx`，通过通道的连接方式实现正向代理。

# 实现

## 环境

- 服务器：`ubuntu 20.04.4`
- `OpenSSL 1.1.1f`（自带）

## 安装依赖

```bash
sudo apt-get update && sudo apt-get install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev libgd-dev libxml2 libxml2-dev uuid-dev
```

## 克隆 `ngx_http_proxy_connect_module` 项目

```bash
git clone git@github.com:chobits/ngx_http_proxy_connect_module.git
```

## 下载 `nginx` 源码并解压

```
wget  http://nginx.org/download/nginx-1.20.0.tar.gz && tar -zxvf nginx-1.20.0.tar.gz
```

## 构建

1. 进入解压 nginx 的源码路径

   ```bash
   cd nginx-1.20.0
   ```

2. 设置正确的 `patch`

   ```bash
   patch -p1 < /path/to/ngx_http_proxy_connect_module/patch/proxy_connect_rewrite_1018.patch
   ```

3. 设置构建配置

   ```bash
   ./configure --prefix=/var/www/html --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --with-pcre  --lock-path=/var/lock/nginx.lock --with-http_ssl_module --with-http_image_filter_module=dynamic --with-http_v2_module --with-stream=dynamic --with-http_addition_module --with-http_mp4_module --add-dynamic-module=/path/to/ngx_http_proxy_connect_module
   ```

   参数说明：

   > --prefix：构建产物的输出路径
   > --add-dynamic-module: 增加构建模块

4. 构建

   ```bash
   make && make install
   ```

5. 修改配置

   ```bash
   sudo vi /var/www/html/conf/nginx.conf
   ```

   1. 增加加载 `ngx_http_proxy_connect_module` 的配置

      ```nginx
      load_module /var/www/html/modules/ngx_http_proxy_connect_module.so;
      ```

   2. 注释原来的 server 并添加新的 server

      添加的部分

      ```nginx
      server {
          listen                         3128;

          # dns resolver used by forward proxying
          resolver                       114.114.114.114;

          # forward proxy for CONNECT request
          proxy_connect;
          proxy_connect_allow            443 563;
          proxy_connect_connect_timeout  10s;
          proxy_connect_data_timeout     10s;

          # forward proxy for non-CONNECT request
          location / {
              proxy_pass http://$host;
              proxy_set_header Host $host;
          }
      }
      ```

   3. 最终的 `nginx.conf`

      ```nginx
      load_module /var/www/html/modules/ngx_http_proxy_connect_module.so;

      #user  nobody;
      worker_processes  1;

      #error_log  logs/error.log;
      #error_log  logs/error.log  notice;
      #error_log  logs/error.log  info;

      #pid        logs/nginx.pid;


      events {
          worker_connections  1024;
      }


      http {
          include       mime.types;
          default_type  application/octet-stream;

          #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
          #                  '$status $body_bytes_sent "$http_referer" '
          #                  '"$http_user_agent" "$http_x_forwarded_for"';

          #access_log  logs/access.log  main;

          sendfile        on;
          #tcp_nopush     on;

          #keepalive_timeout  0;
          keepalive_timeout  65;

          #gzip  on;

          #server {
          #    listen       8080;
          #    server_name  localhost;

              #charset koi8-r;

              #access_log  logs/host.access.log  main;

          #    location / {
          #        root   html;
          #        index  index.html index.htm;
          #    }

              #error_page  404              /404.html;

              # redirect server error pages to the static page /50x.html
              #
          #    error_page   500 502 503 504  /50x.html;
          #    location = /50x.html {
          #        root   html;
          #    }

              # proxy the PHP scripts to Apache listening on 127.0.0.1:80
              #
              #location ~ \.php$ {
              #    proxy_pass   http://127.0.0.1;
              #}

              # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
              #
              #location ~ \.php$ {
              #    root           html;
              #    fastcgi_pass   127.0.0.1:9000;
              #    fastcgi_index  index.php;
              #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
              #    include        fastcgi_params;
              #}

              # deny access to .htaccess files, if Apache's document root
              # concurs with nginx's one
              #
              #location ~ /\.ht {
              #    deny  all;
              #}
          #}


          server {
          listen                         6666;

          # self signed certificate generated via openssl command
          #ssl_certificate_key            /path/to/server.key;
          #ssl_certificate                /path/to/server.crt;
          #ssl_session_cache              shared:SSL:1m;

          # dns resolver used by forward proxying
          resolver                       114.114.114.114;

          # forward proxy for CONNECT request
          proxy_connect;
          proxy_connect_allow            443 563;
          proxy_connect_connect_timeout  10s;
          proxy_connect_data_timeout     10s;

          # forward proxy for non-CONNECT request
          location / {
              proxy_pass http://$host;
              proxy_set_header Host $host;
          }
      }

          # another virtual host using mix of IP-, name-, and port-based configuration
          #
          #server {
          #    listen       8000;
          #    listen       somename:8080;
          #    server_name  somename  alias  another.alias;

          #    location / {
          #        root   html;
          #        index  index.html index.htm;
          #    }
          #}


          # HTTPS server
          #
          #server {
          #    listen       443 ssl;
          #    server_name  localhost;

          #    ssl_certificate      cert.pem;
          #    ssl_certificate_key  cert.key;

          #    ssl_session_cache    shared:SSL:1m;
          #    ssl_session_timeout  5m;

          #    ssl_ciphers  HIGH:!aNULL:!MD5;
          #    ssl_prefer_server_ciphers  on;

          #    location / {
          #        root   html;
          #        index  index.html index.htm;
          #    }
          #}

      }
      ```

6. 启动 nginx

   ```bash
   ./sbin/nginx
   ```

7. 验证

   ```bash
   $ curl https://github.com/ -v -x 127.0.0.1:3128
                                                           '-
   ```

   输出

   ```
   *   Trying 127.0.0.1...                                           -.
   * Connected to 127.0.0.1 (127.0.0.1) port 3128 (#0)                | curl creates TCP connection with nginx (with proxy_connect module).
   * Establish HTTP proxy tunnel to github.com:443                   -'
   > CONNECT github.com:443 HTTP/1.1                                 -.
   > Host: github.com:443                                         (1) | curl sends CONNECT request to create tunnel.
   > User-Agent: curl/7.43.0                                          |
   > Proxy-Connection: Keep-Alive                                    -'
   >
   < HTTP/1.0 200 Connection Established                             .- nginx replies 200 that tunnel is established.
   ```

## Q&A

1. `patch` 的版本一定要匹配，不然构建会失败

## Reference

1. [ngx_http_proxy_connect_module](https://github.com/chobits/ngx_http_proxy_connect_module)
2. [How To Build Nginx](https://www.alibabacloud.com/blog/how-to-build-nginx-from-source-on-ubuntu-20-04-lts_597793)
