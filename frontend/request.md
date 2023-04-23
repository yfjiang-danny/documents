# Request Reference

用 FormData 在提交数据时候，会自动设置 Content-Type。无论提交普通字段，还是上传文件，都**无需自行设置 Content-Type**。尤其在上传文件时候，自行设置 Content-Type: multipart/form-data，反而会导致上传失败。为浏览器自行添加的 Content-Type，除了 multipart/form-data，还会带上个 boundary，自行添加，会导致 boundary 丢失，服务器就不知道如何分割字段，导致上传失败。
