import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPhotos, getPhotos } from '../redux/reducers/albumsSlice'
import { withRouter, useHistory } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import Preloader from './common/Preloader'
import { Card, Col, Modal, Row } from 'antd'

type PathParamsType = {
  id: string,
}

type PropsType = RouteComponentProps<PathParamsType>

export const Photos: React.FC<PropsType> = (props) => {
  const photos = useSelector(selectPhotos)
  const dispatch = useDispatch()
  const history = useHistory()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [modalImg, setModalImg] = useState<string>('')

  useEffect(() => {
    const id = Number(props.match.params.id)
    if (id) {
      dispatch(getPhotos(id))
    } else {
      history.push('/albums')
    }
  }, [dispatch, history, props.match])

  const openModal = (url: string) => {
    setModalImg(url)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setModalImg('')
    setIsModalVisible(false)
  }

  if (!photos) return <Preloader/>

  return (
    <>
      <Modal visible={isModalVisible} onCancel={closeModal} width={600} footer={null} bodyStyle={{ padding: 0 }}>
        <img src={modalImg} alt="" style={{ width: 600 }}/>
      </Modal>
      <Row gutter={16}>
        {photos.map(photo => <Col span={8} style={{ marginBottom: '1rem' }} key={photo.id}>
            <Card
              hoverable
              cover={<img alt={photo.title} src={photo.thumbnailUrl}/>}
              onClick={() => openModal(photo.url)}
              bodyStyle={{ height: 84 }}
            >
              <Card.Meta description={photo.title}/>
            </Card>
          </Col>
        )}
      </Row>
    </>
  )
}

export default withRouter(Photos)
