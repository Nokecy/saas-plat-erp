export default class extends saasplat.model.base {
  schema = {
    // **单据id
    voucher_id: saasplat.model.type.INTEGER,
    // **
    file_id: saasplat.model.type.STRING,
    // 显示文件名
    name: saasplat.model.type.STRING,
    // 上传日期
    datetime: saasplat.model.type.DATE,
    // 上传人
    uploader_id: saasplat.model.type.INTEGER,
    uploader_name: saasplat.model.type.STRING,
    // ** created deleted
    status: saasplat.model.type.ENUM('created', 'deleted')
  }
}
