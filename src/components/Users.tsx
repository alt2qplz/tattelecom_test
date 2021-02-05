import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserType, getUsers, selectUsers } from '../redux/reducers/usersSlice'
import { Card, Col, Row, Typography } from 'antd'

const { Text, Link } = Typography

const Users: React.FC = () => {
  const users: Array<UserType> = useSelector(selectUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <Row gutter={16}>
        {users.map(user => <Col key={user.id} span={8} style={{ marginBottom: '1rem' }}>
          <Card title={user.username}>
            <Text type="secondary">Name: </Text><Text>{user.name}</Text><br/>
            <Text type="secondary">Company: </Text><Text>{user.company.name}</Text><br/>
            <Text type="secondary">E-mail: </Text><Text>{user.email}</Text><br/>
            <Text type="secondary">Phone: </Text><Text>{user.phone}</Text><br/>
            <Text type="secondary">Web-site: </Text><Link href="#">{user.website}</Link><br/>
            <Text type="secondary">City: </Text><Text>{user.address.city}, </Text><br/>
            <Text type="secondary">Address: </Text><Text>{user.address.street}, {user.address.suite}</Text><br/>
            <Text type="secondary">Zip-code: </Text><Text>{user.address.zipcode}</Text>
          </Card>
        </Col>)}
      </Row>
    </div>
  )
}

export default Users
