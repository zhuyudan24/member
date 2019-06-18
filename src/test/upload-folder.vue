<template>
  <div class="upload">
    <vue-gic-space
      id="dropzone"
      ref="myDropzone"
      :options="dropzoneOptions"
      :action="folderUrl"
      :parentId="parentId"
      :useCustomSlot="true"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将图片或文件夹拖到此处上传，或点击<b>上传</b>图片</div>
      <div class="upload-tips">仅支持5M以内的jpg、png、gif格式的图片</div>
    </vue-gic-space>
  </div>
</template>

<script>
import vueGicSpace from "@gic-test/vue-gic-space/src/components/vue-gic-space";

export default {
  name: "upload-space",
  components: {
    vueGicSpace
  },
  data() {
    return {
      dropzoneOptions: {
        autoProcessQueue: false,
        url:
          "http:gicdev.com/api-mall/gic-cloud-image-upload?requestProject=member",  上传地址
        headers: { "Gic-Header": "header value" }
      },
      parentId: "60404611a2a64502b0612b703f8c3b27",
      folderUrl:
        "http:gicdev.com/api-mall/gic-cloud-image-createUploadFolder?requestProject=member"
    };
  }
};
</script>

