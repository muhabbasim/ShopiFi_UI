import React from 'react'
import './TableRow.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../context/newRequest'
import { Link } from 'react-router-dom'

function TableRow({ gigId, img, title, price, info, icon }) {


  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return newRequest.delete(`/gig/${gigId}` )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usergig'] })
    },
  })

  const hangleDelete = () => {
    mutation.mutate();
  }

  return (
    <tr className='gig-table-row'>
      <td className='img'><img src={img} alt="" /></td>
      <Link className='link' to={`/single/${gigId}`}>
        <td>{title}</td>
      </Link>
      <td className='price'>$ {price}</td>
      <td className='info'>{info}</td>
      <td onClick={hangleDelete}>{icon}</td>
    </tr>
  )
}

export default TableRow