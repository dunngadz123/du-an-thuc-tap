/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Card } from '@mui/material';
import { detailNV, vaitro } from 'services/NhanVienService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MyVerticallyCenteredModal from './AddVaiTro';

function UpdateNhanVien() {
  const [vaiTroS, setVaiTroS] = useState([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ma: '',
    ten: '',
    sdt: '',
    email: '',
    diaChi: '',
    ngaySinh: '',
    matKhau: '',
    vaiTro: '',
    trangThai: ''
  });

  //Vai Trò:
  const [modalShow, setModalShow] = useState(false);
  const [valuesVT, setValuesVT] = useState({
    ten: '',
    trangThai: 1
  });

  const closeModal = () => {
    setModalShow(false);
    getAllVaiTro();
    setValuesVT({
      ten: '',
      trangThai: 1
    });
  };

  const handleSubmitVT = (event) => {
    event.preventDefault();
    post(valuesVT);
  };

  const post = async (value) => {
    const res = await postCreate(value);
    if (res) {
      toast.success('Thêm thành công');
      closeModal();
      getAllVaiTro(0);
    }
  };
  //

  const [anh, setAnh] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    detail(id);
  }, [id]);

  const updateKHFormData = async (ids, formData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/nhanvien/update/${ids}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('ten', values.ten);
    formData.append('sdt', values.sdt);
    formData.append('email', values.email);
    formData.append('diaChi', values.diaChi);
    formData.append('ngaySinh', values.ngaySinh);
    formData.append('matKhau', values.matKhau);
    formData.append('vaiTro', values.vaiTro);
    formData.append('trangThai', values.trangThai);
    formData.append('anh', anh);

    try {
      const res = await updateKHFormData(id, formData);
      if (res) {
        toast.success('Cập nhật thành công!');
        navigate('/nhan-vien');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi cập nhật khách hàng');
    }
  };

  const handlePreviewAnh = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAnh(file);
  };

  const detail = async (id) => {
    const res = await detailNV(id);
    if (res) {
      const { ngaySinh, vaiTro, ...values } = res.data;
      setValues({
        ...values,
        vaiTro: vaiTro, // Gán giá trị của vaiTro từ API
        ngaySinh: formatDate(ngaySinh)
      });
    }
  };

  useEffect(() => {
    getAllVaiTro();
  }, []);

  const getAllVaiTro = async () => {
    let res = await vaitro();
    if (res) {
      setVaiTroS(res.data);
    }
  };

  console.log(values);

  const formatDate = (date) => {
    const formattedDate = new Date(parseInt(date, 10)).toISOString().slice(0, 10);
    return formattedDate;
  };

  return (
    <MainCard>
      <Card>
        <div className="div">
          <div className="body flex-grow-1 px-3">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="ma" className="form-label">
                  Mã Nhân Viên
                </label>
                <input
                  id="ma"
                  type="text"
                  disabled
                  className="form-control"
                  value={values.ma}
                  onChange={(e) => setValues({ ...values, ma: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="tenNhanVien" className="form-label">
                  Tên Nhân Viên
                </label>
                <input
                  id="tenNhanVien"
                  type="text"
                  className="form-control"
                  value={values.ten}
                  onChange={(e) => setValues({ ...values, ten: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="sdt" className="form-label">
                  Số Điện Thoại
                </label>
                <input
                  id="sdt"
                  type="text"
                  className="form-control"
                  value={values.sdt}
                  onChange={(e) => setValues({ ...values, sdt: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="diaChi" className="form-label">
                  Địa Chỉ
                </label>
                <input
                  id="diaChi"
                  type="text"
                  className="form-control"
                  value={values.diaChi}
                  onChange={(e) => setValues({ ...values, diaChi: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="ngaySinh" className="form-label">
                  Ngày Sinh
                </label>
                <input
                  id="ngaySinh"
                  type="date"
                  className="form-control"
                  value={values.ngaySinh}
                  onChange={(e) => setValues({ ...values, ngaySinh: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="matKhau" className="form-label">
                  Mật khẩu
                </label>
                <input
                  id="matKhau"
                  type="text"
                  className="form-control"
                  value={values.matKhau}
                  onChange={(e) => setValues({ ...values, matKhau: e.target.value })}
                />
              </div>

              <div className="col-6">
                <label className="form-label me-3" htmlFor="vaiTro">
                  Vai Trò{' '}
                  <span
                    role="button"
                    tabIndex={0}
                    className="fa-solid"
                    onClick={() => setModalShow(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setModalShow(true);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </span>
                </label>{' '}
                <select
                  id="vaiTro"
                  className="form-select"
                  aria-label="Default select example"
                  value={values.vaiTro} // Đặt giá trị của trường <select> thành giá trị đã chọn (values.vaiTro)
                  onChange={(e) => setValues({ ...values, vaiTro: e.target.value })}
                >
                  {vaiTroS.map((d) => (
                    <option key={d.id} value={d.id} selected={d.id === values.vaiTro.id}>
                      {d.ten}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6">
                <label htmlFor="a" className="form-label">
                  Ảnh
                </label>
                <input type="file" id="anh" className="form-control" name="anh" onChange={handlePreviewAnh} />
                {anh && <img src={anh.preview} alt="" width="70%"></img>}
              </div>
              <div className="col-12">
                <label htmlFor="a" className="form-label me-3">
                  Trạng thái:{' '}
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="0"
                    checked={values.trangThai === 0}
                    onChange={() => setValues({ ...values, trangThai: 0 })}
                  />
                  <label htmlFor="a" className="form-check-label">
                    Hoạt động
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="1"
                    checked={values.trangThai === 1}
                    onChange={() => setValues({ ...values, trangThai: 1 })}
                  />
                  <label htmlFor="a" className="form-check-label">
                    Không hoạt động
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleSubmit={handleSubmitVT}
          values={valuesVT}
          setValues={setValuesVT}
        />
      </Card>
    </MainCard>
  );
}

export default UpdateNhanVien;
