module.exports = {
  retrieveAddress: (params) => `
  update addresses
  set processing=true,
  updated_date=now()
  where id = (
      select id
      from addresses
      where not processing
      and not processed
      and env='${params.bddEnv}'
      limit 1
  ) returning *;
  `
}