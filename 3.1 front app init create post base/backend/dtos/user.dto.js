module.exports= class UserDto{
email
id
isActivate
auhtor
constructor(model){
this.email=model.email,
this.auhtor=model.auhtor
this.id=model._id,
this.isActivate=model.isActivate
}
}
