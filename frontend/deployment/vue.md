# Vue 多服务集成部署（nginx 子路径）

1. 给每个 vue 服务分配一个子路径，并在路由中配置 `base`
   example: `src/route/index.ts`

   ```typescript
   // ...
   export default new Router({
     mode: "history",
     base: "/nginx_sub_path/",
     routes: [
       // ...
     ],
   });
   /**
    * export default createRouter({
        history: createWebHistory("/nginx_sub_path/"),
        routes: [
            //...
        ]
    })
   */
   // ...
   ```

2. Nginx config: `nginx.conf`

   ```conf
    http {
        server {
            listen 80;
            server_name localhost;

            location /nginx_sub_path1/ {
                root absolute_path_to_project_1
                index index.html;
            }

            location /nginx_sub_path2/ {
                root absolute_path_to_project_2
                index index.html;
            }

            location / {
                proxy_pass http://localhost/nginx_sub_path1/;
            }
        }
    }
   ```

   Or use sub domain:

   ```conf
   http {
        server {
            listen 80;
            server_name sub_path1.domain.com;

            location / {
                root absolute_path_to_project_1
                index index.html;
            }
        }

        server {
            listen 80;
            server_name sub_path2.domain.com;

            location / {
                root absolute_path_to_project_2
                index index.html;
            }
        }
   }
   ```
