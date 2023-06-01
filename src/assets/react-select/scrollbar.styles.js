export const selectStyles = {
    menuList: (base) => ({
      ...base,
  
      "::-webkit-scrollbar": {
        width: "8px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: 'transparent'
      },
      "::-webkit-scrollbar-thumb": {
        background: '#f36e6e',
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555"
      }
    })
  }