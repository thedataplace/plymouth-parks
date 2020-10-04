# JSONAPI serializer for data entries
class SerializableUser < JSONAPI::Serializable::Resource
  type 'users'

  attributes :id,
             :name,
             :email
end
