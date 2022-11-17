export default function NotifacationToast({text = 'mensaje', color= '', textColor= ''}) {
  return (
    <>
      <div className="toast toast-top">
        <div className={`alert shadown ${color} ${textColor}`}>
          <div>
            <i className="ri-information-line"></i>
            <span>{text}</span>
          </div>
        </div>
      </div>
    </>
  )
}