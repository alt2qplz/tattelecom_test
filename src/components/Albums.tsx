import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAlbums, selectAlbums } from '../redux/reducers/albumsSlice'
import { NavLink } from 'react-router-dom'
import { Card, Col, Row } from 'antd'
import albumThumb from '../assets/albumThumb.png'

export const Albums: React.FC = () => {
  const albums = useSelector(selectAlbums)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch])

  return (
    <Row gutter={16}>
      {albums.map(album =>
        <Col span={6} style={{ marginBottom: '1rem' }} key={album.id}>
          <NavLink to={`/albums/${album.id}`}>
            <Card
              hoverable
              cover={<img alt="example" src={albumThumb}/>}
              bodyStyle={{ height: 84 }}
            >
              <Card.Meta description={album.title}/>
            </Card>
          </NavLink>
        </Col>
      )}
    </Row>
  )
}

export default Albums
