# Nginx Reference

1. `http2` 的坑
   错误示例：

   ```nginx
   http {
       server {
           listen 80 http2;

           # ...

           location / {
               index index.html;
               root html;
           }
       }
   }
   ```

   `http2` 是基于 `TLS` 实现的，所以使用 `http2` 的前提是必须有证书，并且 `nginx` 服务器必须大于 `1.9.5`。否则就会出现解析失败的情况。

   一个比较完整的 `http2` 配置案例：

   ```nginx
   http {
      server {
           listen 80;
           server_name xxx;
           rewrite ^(.*) https://$server_name$1 permanent;
      }

      server {
            listen 443 ssl http2;
            server_name xxx;
            ssl_certificate /etc/nginx/certs/xxx.crt;
            ssl_certificate_key /etc/nginx/certs/xxx.key;

            include       mime.types;

            gzip on;
            gzip_proxied any;
            gzip_comp_level 4;
            gzip_types application/javascript application/json text/css;


            location / {
               index index.html;
               root html;
            }
      }
   }
   ```
