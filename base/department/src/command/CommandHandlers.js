export async function deleteDepartment({
  id
}) {
  let dept = await saasplat.repository.get('Department', id);
  dept.delete();
  await saasplat.repository.save(dept);
  await saasplat.repository.commit();
}

export async function changeEnable({
  id,enable
}) {
  let dept = await saasplat.repository.get('Department', id);
  dept.update({
    enable
  });
  await saasplat.repository.save(dept);
  await saasplat.repository.commit();
}
