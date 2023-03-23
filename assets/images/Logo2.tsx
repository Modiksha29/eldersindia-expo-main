import * as React from "react"
import Svg, {
  SvgProps,
  G,
  ClipPath,
  Path,
  LinearGradient,
  Stop,
} from "react-native-svg"

const Logo2 = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <G transform="matrix(.78 0 0 .78 600 314)" clipPath="url(#a)">
      <ClipPath id="a">
        <Path
          transform="translate(-595.3 -255.12)"
          d="M0 0h1190.6v510.23H0z"
          strokeLinecap="round"
        />
      </ClipPath>
      <Path
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "#fff",
          fillOpacity: 0,
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="translate(-595.3 -255.12)"
        d="M0 510.23h1190.6V0H0z"
        fill="none"
      />
    </G>
    <Path
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#221e1f",
        fillRule: "evenodd",
        opacity: 1,
      }}
      vectorEffect="non-scaling-stroke"
      transform="matrix(.78 0 0 .78 135.722 114.133)"
      d="M736.36 456.2a17.2 17.2 0 0 1-3.473 1.098 18.22 18.22 0 0 1-3.707.363c-2.273 0-4.441-.297-6.472-.895a19.744 19.744 0 0 1-5.59-2.578c-2.875-1.992-5.074-4.504-6.594-7.535-1.52-3.02-2.285-6.402-2.285-10.14 0-3.04.512-5.837 1.52-8.388 1.019-2.543 2.53-4.824 4.542-6.84a19.656 19.656 0 0 1 6.621-4.374c2.5-1.008 5.157-1.508 7.973-1.508 1.11 0 2.227.086 3.356.277 1.129.172 2.285.438 3.472.781l.864 6.301a13.996 13.996 0 0 0-3.512-1.457 15.725 15.725 0 0 0-3.953-.488c-4.246 0-7.79 1.48-10.605 4.445-2.813 2.961-4.215 6.707-4.215 11.25 0 2.285.363 4.375 1.086 6.29a14.667 14.667 0 0 0 3.219 5.038 14.522 14.522 0 0 0 4.718 3.2c1.797.765 3.63 1.148 5.516 1.148 1.086 0 2.078-.082 2.98-.227a13.993 13.993 0 0 0 2.586-.695c.364-.148.758-.336 1.18-.539.422-.215.942-.492 1.551-.836zm-145.48-22.727h4.363c2.367 0 4.153-.516 5.34-1.523 1.188-1.02 1.774-2.551 1.774-4.602 0-1.93-.579-3.441-1.735-4.508-1.16-1.07-2.797-1.61-4.926-1.61h-4.816zm0 18.184h4.816c2.875 0 4.965-.488 6.246-1.46 1.297-.981 1.946-2.532 1.946-4.661 0-2.414-.774-4.219-2.313-5.426-1.543-1.203-3.847-1.812-6.91-1.812h-3.785zm-5.887 5.121v-40.434h10.25c4.121 0 7.242.875 9.38 2.629 2.14 1.754 3.206 4.305 3.206 7.66 0 1.875-.398 3.543-1.203 4.992-.805 1.465-2.023 2.707-3.629 3.739 2.176.824 3.871 2.12 5.078 3.882 1.207 1.766 1.817 3.836 1.817 6.243 0 3.695-1.18 6.504-3.532 8.414-2.355 1.914-5.808 2.875-10.34 2.875zm383-3.933c-2.035 1.53-4.082 2.687-6.152 3.46-2.07.786-4.121 1.18-6.148 1.18-2.2 0-4.25-.383-6.141-1.14a15.098 15.098 0 0 1-5.094-3.344 15.186 15.186 0 0 1-3.5-5.051c-.804-1.895-1.207-3.914-1.207-6.063 0-2.128.403-4.148 1.196-6.074.796-1.922 1.921-3.605 3.406-5.039 1.469-1.473 3.117-2.582 4.933-3.316 1.825-.735 3.805-1.11 5.942-1.11 2.918 0 5.535.68 7.851 2.036 2.313 1.34 4.196 3.304 5.63 5.875l-21.61 13.358c.785 1.38 1.942 2.489 3.48 3.325 1.532.832 3.22 1.246 5.055 1.246 1.649 0 3.403-.414 5.258-1.227 1.863-.816 3.832-2.05 5.922-3.719zm-22.473-10.262 15.055-9.22a7.874 7.874 0 0 0-2.453-1.511c-.89-.336-1.851-.5-2.894-.5-2.852 0-5.188.992-6.992 2.973-1.813 1.98-2.715 4.562-2.715 7.75zm-26.758 10.035c-1.785 1.636-3.57 2.855-5.375 3.632a14.312 14.312 0 0 1-5.75 1.176c-1.968 0-3.843-.375-5.617-1.121-1.777-.746-3.394-1.852-4.867-3.305-1.559-1.55-2.727-3.265-3.524-5.14a15.156 15.156 0 0 1-1.195-5.973c0-2.148.403-4.148 1.207-6.031.805-1.875 1.973-3.551 3.512-5.024a15.851 15.851 0 0 1 4.992-3.257c1.883-.774 3.785-1.164 5.719-1.164 2.11 0 4.031.34 5.77 1.035 1.734.687 3.292 1.75 4.695 3.16l-3.422 3.808c-.922-.933-1.953-1.64-3.102-2.109a9.347 9.347 0 0 0-3.656-.719c-2.836 0-5.2.98-7.102 2.934-1.894 1.953-2.843 4.394-2.843 7.32 0 2.871.937 5.305 2.812 7.297 1.883 1.988 4.14 2.988 6.79 2.988 1.382 0 2.667-.261 3.855-.793 1.187-.527 2.355-1.363 3.511-2.5zm-55.922 4.687v-30.25l5.711-.531v30.254zm3.004-33.84-3.945-4.707 3.828-4.648 3.766 4.648zm-58.785 18.422c0-2.148.403-4.16 1.207-6.031.805-1.875 1.973-3.551 3.504-5.024a15.91 15.91 0 0 1 5.149-3.335c1.914-.766 3.94-1.149 6.09-1.149 2.128 0 4.171.383 6.124 1.149 1.95.765 3.657 1.851 5.121 3.277a15.283 15.283 0 0 1 3.493 5.05 15.348 15.348 0 0 1 1.214 6.063c0 2.168-.402 4.188-1.199 6.074-.793 1.89-1.96 3.567-3.508 5.04a15.862 15.862 0 0 1-5.152 3.335c-1.914.766-3.945 1.149-6.094 1.149-2.203 0-4.257-.383-6.148-1.14a15.197 15.197 0 0 1-5.09-3.345c-1.531-1.472-2.7-3.156-3.504-5.05-.804-1.895-1.207-3.915-1.207-6.063m5.77.012c0 3.008.968 5.511 2.902 7.492 1.934 1.984 4.356 2.973 7.27 2.973 2.902 0 5.347-1 7.308-2.993 1.961-1.988 2.942-4.484 2.942-7.472 0-2.985-.981-5.477-2.934-7.457-1.95-1.98-4.395-2.973-7.317-2.973-2.914 0-5.335.992-7.269 2.965-1.934 1.969-2.902 4.46-2.902 7.465m-52.613 15.406v-41.547l5.59-.532v15.652c1.05-1.468 2.316-2.597 3.777-3.37 1.46-.778 3.05-1.16 4.758-1.16 3.136 0 5.511 1.07 7.12 3.218 1.61 2.148 2.41 5.336 2.41 9.566v17.645l-5.589.528v-18.547c0-2.758-.418-4.707-1.273-5.856-.856-1.148-2.266-1.726-4.246-1.726-2.375 0-4.13.765-5.262 2.285-1.125 1.52-1.695 3.883-1.695 7.082v16.234zm-127.21 8.886 7.847-15.43-11.96-23.414 5.003-1 9.594 18.59 8.477-18.59 5.004 1-18.586 40.2zm-144.43-8.886v-30.25l5.472-.532v4.25c.942-1.425 2.09-2.5 3.442-3.25 1.367-.746 2.855-1.113 4.484-1.113 1.688 0 3.207.41 4.574 1.246 1.36.832 2.47 2.027 3.332 3.578 1.227-1.59 2.57-2.797 4.024-3.61 1.46-.816 3-1.214 4.64-1.214 3.157 0 5.5 1.035 7.012 3.117 1.52 2.078 2.277 5.278 2.277 9.606v17.645l-5.472.527v-18.547c0-2.738-.407-4.687-1.2-5.848-.796-1.156-2.097-1.734-3.925-1.734-2.207 0-3.813.746-4.832 2.234-1.012 1.5-1.52 3.875-1.52 7.133v16.234l-5.36.528v-18.547c0-2.739-.402-4.688-1.198-5.848-.793-1.156-2.098-1.735-3.918-1.735-2.192 0-3.797.754-4.817 2.266-1.031 1.52-1.543 3.883-1.543 7.102v16.234zm-55.195-15.418c0-2.149.402-4.16 1.207-6.032a15.348 15.348 0 0 1 3.504-5.023 15.869 15.869 0 0 1 5.148-3.336c1.914-.766 3.945-1.148 6.094-1.148 2.129 0 4.168.383 6.117 1.148 1.953.766 3.66 1.852 5.125 3.277a15.214 15.214 0 0 1 3.488 5.051c.817 1.914 1.22 3.934 1.22 6.063 0 2.168-.403 4.187-1.196 6.074-.797 1.89-1.965 3.566-3.512 5.039a15.821 15.821 0 0 1-5.152 3.336c-1.914.766-3.942 1.148-6.09 1.148-2.21 0-4.258-.382-6.152-1.14a15.159 15.159 0 0 1-5.09-3.344 15.255 15.255 0 0 1-3.504-5.05c-.805-1.895-1.207-3.915-1.207-6.063m5.77.011c0 3.008.972 5.512 2.902 7.493 1.933 1.984 4.36 2.972 7.27 2.972 2.905 0 5.343-1 7.308-2.992 1.96-1.988 2.941-4.484 2.941-7.473 0-2.984-.98-5.476-2.93-7.457-1.953-1.98-4.398-2.972-7.32-2.972-2.91 0-5.336.992-7.27 2.964-1.929 1.97-2.902 4.461-2.902 7.465m-34.71 10.836c-1.512 1.582-3.141 2.758-4.887 3.531-1.746.778-3.656 1.16-5.746 1.16a14.68 14.68 0 0 1-5.66-1.109c-1.786-.734-3.395-1.804-4.836-3.199a14.888 14.888 0 0 1-3.504-5.07c-.805-1.922-1.203-3.953-1.203-6.102 0-2.168.398-4.187 1.195-6.07.793-1.895 1.96-3.57 3.512-5.043a15.835 15.835 0 0 1 5.02-3.285 15.269 15.269 0 0 1 5.82-1.137c1.949 0 3.804.39 5.55 1.164 1.738.777 3.317 1.926 4.738 3.434v-15.25l5.59-.532v41.551l-5.59.649zm-20.07-10.78c0 2.976.96 5.456 2.894 7.437 1.922 1.984 4.316 2.972 7.168 2.972 2.836 0 5.21-.988 7.133-2.964 1.914-1.97 2.875-4.453 2.875-7.446 0-3-.953-5.492-2.844-7.464-1.906-1.97-4.29-2.961-7.164-2.961-2.852 0-5.246 1-7.168 2.992-1.934 1.992-2.895 4.473-2.895 7.433m-27.777 10.891c-2.03 1.532-4.078 2.688-6.152 3.461-2.066.785-4.117 1.18-6.148 1.18-2.196 0-4.246-.383-6.14-1.14-1.903-.754-3.59-1.864-5.09-3.344-1.532-1.473-2.7-3.157-3.505-5.051-.8-1.895-1.203-3.914-1.203-6.063 0-2.129.403-4.148 1.196-6.074a14.776 14.776 0 0 1 3.402-5.039c1.473-1.473 3.121-2.582 4.933-3.316 1.825-.735 3.805-1.11 5.946-1.11 2.914 0 5.531.68 7.847 2.035 2.313 1.34 4.2 3.305 5.63 5.875l-21.61 13.36c.786 1.378 1.946 2.488 3.485 3.324 1.531.832 3.219 1.246 5.05 1.246 1.649 0 3.403-.414 5.258-1.227 1.864-.816 3.836-2.05 5.926-3.719zm-22.473-10.262 15.06-9.218a7.874 7.874 0 0 0-2.454-1.512c-.894-.336-1.855-.5-2.894-.5-2.856 0-5.188.992-6.992 2.973-1.817 1.98-2.72 4.562-2.72 7.75zm-27.777 10.262c-2.03 1.532-4.078 2.688-6.148 3.461-2.07.785-4.121 1.18-6.152 1.18-2.196 0-4.246-.383-6.14-1.14-1.903-.754-3.59-1.864-5.09-3.344-1.532-1.473-2.7-3.157-3.5-5.051-.805-1.895-1.208-3.914-1.208-6.063 0-2.129.403-4.148 1.196-6.074a14.776 14.776 0 0 1 3.402-5.039c1.473-1.473 3.121-2.582 4.937-3.316 1.825-.735 3.805-1.11 5.942-1.11 2.914 0 5.531.68 7.847 2.035 2.317 1.34 4.2 3.305 5.633 5.875l-21.613 13.36c.785 1.378 1.942 2.488 3.485 3.324 1.53.832 3.218 1.246 5.05 1.246 1.649 0 3.407-.414 5.258-1.227 1.864-.816 3.836-2.05 5.926-3.719zm-22.473-10.262 15.06-9.218a7.874 7.874 0 0 0-2.454-1.512c-.894-.336-1.855-.5-2.894-.5-2.852 0-5.188.992-6.992 2.973-1.817 1.98-2.72 4.562-2.72 7.75zm-41.488 14.723v-30.25l5.649-.644v6.293c1.078-2.203 2.48-3.844 4.219-4.922 1.734-1.07 3.875-1.61 6.406-1.61.32 0 .578 0 .762.008.18.012.343.032.503.051l-2.445 5.18c-3.46.305-5.894 1.578-7.316 3.809-1.422 2.234-2.13 6.046-2.13 11.445v10.113zm-43.062 0v-40.96h20.66l1.118 5.296h-15.891v11.77h12.184v5.301h-12.184v18.066z"
    />
    <Path
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#1674b9",
        fillRule: "evenodd",
        opacity: 1,
      }}
      vectorEffect="non-scaling-stroke"
      transform="matrix(.78 0 0 .78 137.996 114.886)"
      d="M50.281 364.46V196.95h90.602l2.93 15.137H65.43v59.828h67.156v15.137H65.43v62.27h82.535l-2.684 15.141z"
    />
    <G transform="matrix(.78 0 0 .78 279.12 331.38)" clipPath="url(#b)">
      <LinearGradient
        id="c"
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(-90 244.76 63.33) scale(61.1)"
        x1={-0.971}
        y1={0}
        x2={1.971}
        y2={0}
      >
        <Stop
          offset="0%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="31.25%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.812%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.203%"
          style={{
            stopColor: "#1e4ba1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.594%"
          style={{
            stopColor: "#1e4da2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.984%"
          style={{
            stopColor: "#1f4fa3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.375%"
          style={{
            stopColor: "#1f50a4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.766%"
          style={{
            stopColor: "#2052a5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.156%"
          style={{
            stopColor: "#2053a6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.547%"
          style={{
            stopColor: "#2255a7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.938%"
          style={{
            stopColor: "#2257a8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.328%"
          style={{
            stopColor: "#2358a9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.719%"
          style={{
            stopColor: "#235aaa",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.109%"
          style={{
            stopColor: "#235bab",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.5%"
          style={{
            stopColor: "#245dac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.891%"
          style={{
            stopColor: "#255eac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.281%"
          style={{
            stopColor: "#2560ad",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.672%"
          style={{
            stopColor: "#2661ae",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.062%"
          style={{
            stopColor: "#2762af",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.453%"
          style={{
            stopColor: "#2664b0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.844%"
          style={{
            stopColor: "#2765b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.234%"
          style={{
            stopColor: "#2866b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.625%"
          style={{
            stopColor: "#2767b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.016%"
          style={{
            stopColor: "#2a68b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.406%"
          style={{
            stopColor: "#2b69b4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.797%"
          style={{
            stopColor: "#2b6ab5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.188%"
          style={{
            stopColor: "#2b6cb6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.578%"
          style={{
            stopColor: "#2c6db6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.969%"
          style={{
            stopColor: "#2c6eb7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.359%"
          style={{
            stopColor: "#2d6fb8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.75%"
          style={{
            stopColor: "#2d70b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.141%"
          style={{
            stopColor: "#2e71b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.531%"
          style={{
            stopColor: "#2e72ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.922%"
          style={{
            stopColor: "#3073ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.312%"
          style={{
            stopColor: "#2e74bb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.703%"
          style={{
            stopColor: "#2f75bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.094%"
          style={{
            stopColor: "#2f76bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.484%"
          style={{
            stopColor: "#3177bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.875%"
          style={{
            stopColor: "#3178be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.266%"
          style={{
            stopColor: "#3078be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.656%"
          style={{
            stopColor: "#3179bf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.047%"
          style={{
            stopColor: "#327abf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.438%"
          style={{
            stopColor: "#337bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.828%"
          style={{
            stopColor: "#327cc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.219%"
          style={{
            stopColor: "#337dc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.609%"
          style={{
            stopColor: "#347dc2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50%"
          style={{
            stopColor: "#337ec2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.391%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.781%"
          style={{
            stopColor: "#3381c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.172%"
          style={{
            stopColor: "#3481c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.562%"
          style={{
            stopColor: "#3582c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.953%"
          style={{
            stopColor: "#3583c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.344%"
          style={{
            stopColor: "#3683c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.734%"
          style={{
            stopColor: "#3584c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.125%"
          style={{
            stopColor: "#3684c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.516%"
          style={{
            stopColor: "#3685c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.906%"
          style={{
            stopColor: "#3585c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.297%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.688%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.078%"
          style={{
            stopColor: "#3787c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.469%"
          style={{
            stopColor: "#3787c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.859%"
          style={{
            stopColor: "#3688c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.25%"
          style={{
            stopColor: "#3888c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.641%"
          style={{
            stopColor: "#3788c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.031%"
          style={{
            stopColor: "#3789c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.422%"
          style={{
            stopColor: "#3889c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.812%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="58.594%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="59.375%"
          style={{
            stopColor: "#378aca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.156%"
          style={{
            stopColor: "#388bca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.938%"
          style={{
            stopColor: "#388bcb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="62.5%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="75%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="100%"
          style={{
            stopColor: "#388dcc",
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
      <ClipPath id="b">
        <Path
          transform="translate(-181.43 -277.53)"
          clipPath="url(#undefined)"
          d="M174.35 190.61V367.4l14.16-2.93V187.68z"
          strokeLinecap="round"
        />
      </ClipPath>
      <Path
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "url(#c)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="translate(-181.43 -277.53)"
        d="M174.35 367.39h14.16V187.67h-14.16z"
      />
    </G>
    <G transform="matrix(.78 0 0 .78 355.52 331.38)" clipPath="url(#d)">
      <LinearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 -61.1 61.1 0 279.96 308.09)"
        x1={-0.971}
        y1={0}
        x2={1.971}
        y2={0}
      >
        <Stop
          offset="0%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="31.25%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.812%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.203%"
          style={{
            stopColor: "#1e4ba1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.594%"
          style={{
            stopColor: "#1e4da2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.984%"
          style={{
            stopColor: "#1f4fa3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.375%"
          style={{
            stopColor: "#1f50a4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.766%"
          style={{
            stopColor: "#2052a5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.156%"
          style={{
            stopColor: "#2053a6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.547%"
          style={{
            stopColor: "#2255a7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.938%"
          style={{
            stopColor: "#2257a8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.328%"
          style={{
            stopColor: "#2358a9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.719%"
          style={{
            stopColor: "#235aaa",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.109%"
          style={{
            stopColor: "#235bab",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.5%"
          style={{
            stopColor: "#245dac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.891%"
          style={{
            stopColor: "#255eac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.281%"
          style={{
            stopColor: "#2560ad",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.672%"
          style={{
            stopColor: "#2661ae",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.062%"
          style={{
            stopColor: "#2762af",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.453%"
          style={{
            stopColor: "#2664b0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.844%"
          style={{
            stopColor: "#2765b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.234%"
          style={{
            stopColor: "#2866b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.625%"
          style={{
            stopColor: "#2767b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.016%"
          style={{
            stopColor: "#2a68b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.406%"
          style={{
            stopColor: "#2b69b4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.797%"
          style={{
            stopColor: "#2b6ab5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.188%"
          style={{
            stopColor: "#2b6cb6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.578%"
          style={{
            stopColor: "#2c6db6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.969%"
          style={{
            stopColor: "#2c6eb7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.359%"
          style={{
            stopColor: "#2d6fb8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.75%"
          style={{
            stopColor: "#2d70b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.141%"
          style={{
            stopColor: "#2e71b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.531%"
          style={{
            stopColor: "#2e72ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.922%"
          style={{
            stopColor: "#3073ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.312%"
          style={{
            stopColor: "#2e74bb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.703%"
          style={{
            stopColor: "#2f75bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.094%"
          style={{
            stopColor: "#2f76bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.484%"
          style={{
            stopColor: "#3177bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.875%"
          style={{
            stopColor: "#3178be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.266%"
          style={{
            stopColor: "#3078be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.656%"
          style={{
            stopColor: "#3179bf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.047%"
          style={{
            stopColor: "#327abf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.438%"
          style={{
            stopColor: "#337bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.828%"
          style={{
            stopColor: "#327cc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.219%"
          style={{
            stopColor: "#337dc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.609%"
          style={{
            stopColor: "#347dc2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50%"
          style={{
            stopColor: "#337ec2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.391%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.781%"
          style={{
            stopColor: "#3381c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.172%"
          style={{
            stopColor: "#3481c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.562%"
          style={{
            stopColor: "#3582c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.953%"
          style={{
            stopColor: "#3583c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.344%"
          style={{
            stopColor: "#3683c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.734%"
          style={{
            stopColor: "#3584c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.125%"
          style={{
            stopColor: "#3684c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.516%"
          style={{
            stopColor: "#3685c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.906%"
          style={{
            stopColor: "#3585c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.297%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.688%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.078%"
          style={{
            stopColor: "#3787c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.469%"
          style={{
            stopColor: "#3787c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.859%"
          style={{
            stopColor: "#3688c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.25%"
          style={{
            stopColor: "#3888c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.641%"
          style={{
            stopColor: "#3788c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.031%"
          style={{
            stopColor: "#3789c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.422%"
          style={{
            stopColor: "#3889c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.812%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="58.594%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="59.375%"
          style={{
            stopColor: "#378aca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.156%"
          style={{
            stopColor: "#388bca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.938%"
          style={{
            stopColor: "#388bcb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="62.5%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="75%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="100%"
          style={{
            stopColor: "#388dcc",
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
      <ClipPath id="d">
        <Path
          transform="translate(-279.97 -277.53)"
          clipPath="url(#undefined)"
          d="M329.16 190.61v72.52h-.492c-11.953-13.672-28.566-24.176-48.586-24.176-35.414 0-63.488 27.84-63.488 63.734 0 38.582 28.32 64.711 63.98 64.711 20.023 0 38.809-11.234 48.094-23.441h.492v23.441l14.164-2.93V187.68zm-98.406 112.08c0-24.418 19.547-49.574 48.59-49.574 26.867 0 49.816 18.562 49.816 50.305 0 26.617-21.977 49.816-49.34 49.816-29.52 0-49.066-21.977-49.066-50.547"
          strokeLinecap="round"
        />
      </ClipPath>
      <Path
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "url(#e)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="translate(-279.96 -277.53)"
        d="M216.6 367.39h126.73V187.67H216.6z"
      />
    </G>
    <G transform="matrix(.78 0 0 .78 463.73 351.25)" clipPath="url(#f)">
      <LinearGradient
        id="g"
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(-90 379.34 -40.2) scale(71.93)"
        x1={-0.393}
        y1={0}
        x2={1.393}
        y2={0}
      >
        <Stop
          offset="0%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="12.5%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="18.75%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="21.875%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="22.266%"
          style={{
            stopColor: "#1c4ba1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="22.656%"
          style={{
            stopColor: "#1d4ca1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="23.047%"
          style={{
            stopColor: "#1e4da2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="23.438%"
          style={{
            stopColor: "#1e4ea2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="23.828%"
          style={{
            stopColor: "#1e4fa3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="24.219%"
          style={{
            stopColor: "#1f50a4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="24.609%"
          style={{
            stopColor: "#1f51a4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25%"
          style={{
            stopColor: "#2052a5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25.391%"
          style={{
            stopColor: "#2053a6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25.781%"
          style={{
            stopColor: "#2154a6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="26.172%"
          style={{
            stopColor: "#2255a7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="26.562%"
          style={{
            stopColor: "#2256a7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="26.953%"
          style={{
            stopColor: "#2157a8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="27.344%"
          style={{
            stopColor: "#2158a9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="27.734%"
          style={{
            stopColor: "#2359a9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="28.125%"
          style={{
            stopColor: "#235aaa",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="28.516%"
          style={{
            stopColor: "#245baa",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="28.906%"
          style={{
            stopColor: "#255bab",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="29.297%"
          style={{
            stopColor: "#235cab",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="29.688%"
          style={{
            stopColor: "#245eac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="30.078%"
          style={{
            stopColor: "#255eac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="30.469%"
          style={{
            stopColor: "#255fad",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="30.859%"
          style={{
            stopColor: "#2660ae",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="31.25%"
          style={{
            stopColor: "#2561ae",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="31.641%"
          style={{
            stopColor: "#2662af",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.031%"
          style={{
            stopColor: "#2762af",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.422%"
          style={{
            stopColor: "#2763b0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.812%"
          style={{
            stopColor: "#2664b0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.203%"
          style={{
            stopColor: "#2765b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.594%"
          style={{
            stopColor: "#2865b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.984%"
          style={{
            stopColor: "#2766b2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.375%"
          style={{
            stopColor: "#2867b2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.766%"
          style={{
            stopColor: "#2967b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.156%"
          style={{
            stopColor: "#2a68b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.547%"
          style={{
            stopColor: "#2969b4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.938%"
          style={{
            stopColor: "#2a6ab4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.328%"
          style={{
            stopColor: "#2b6ab5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.719%"
          style={{
            stopColor: "#2b6bb5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.109%"
          style={{
            stopColor: "#2b6cb6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.5%"
          style={{
            stopColor: "#2a6cb6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.891%"
          style={{
            stopColor: "#2c6db6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.281%"
          style={{
            stopColor: "#2d6eb7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.672%"
          style={{
            stopColor: "#2c6fb8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.062%"
          style={{
            stopColor: "#2d6fb8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.453%"
          style={{
            stopColor: "#2c70b8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.844%"
          style={{
            stopColor: "#2d70b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.234%"
          style={{
            stopColor: "#2f71b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.625%"
          style={{
            stopColor: "#2d72ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.016%"
          style={{
            stopColor: "#2e72ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.406%"
          style={{
            stopColor: "#2e73ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.797%"
          style={{
            stopColor: "#2f73bb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.188%"
          style={{
            stopColor: "#2e74bb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.578%"
          style={{
            stopColor: "#2f75bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.969%"
          style={{
            stopColor: "#2f75bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.359%"
          style={{
            stopColor: "#3076bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.75%"
          style={{
            stopColor: "#2f76bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.141%"
          style={{
            stopColor: "#3177bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.531%"
          style={{
            stopColor: "#3077bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.922%"
          style={{
            stopColor: "#3178be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.312%"
          style={{
            stopColor: "#3078be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.703%"
          style={{
            stopColor: "#3279bf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.094%"
          style={{
            stopColor: "#3179bf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.484%"
          style={{
            stopColor: "#327abf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.875%"
          style={{
            stopColor: "#327bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.266%"
          style={{
            stopColor: "#317bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.656%"
          style={{
            stopColor: "#337bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.047%"
          style={{
            stopColor: "#327cc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.438%"
          style={{
            stopColor: "#337cc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.828%"
          style={{
            stopColor: "#337dc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.219%"
          style={{
            stopColor: "#347dc2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.609%"
          style={{
            stopColor: "#347dc2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50%"
          style={{
            stopColor: "#337ec2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.391%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.781%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.172%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.562%"
          style={{
            stopColor: "#3581c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.953%"
          style={{
            stopColor: "#3481c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.344%"
          style={{
            stopColor: "#3481c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.734%"
          style={{
            stopColor: "#3582c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.125%"
          style={{
            stopColor: "#3583c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.516%"
          style={{
            stopColor: "#3583c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.906%"
          style={{
            stopColor: "#3683c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.297%"
          style={{
            stopColor: "#3584c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.688%"
          style={{
            stopColor: "#3584c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.078%"
          style={{
            stopColor: "#3584c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.469%"
          style={{
            stopColor: "#3684c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.859%"
          style={{
            stopColor: "#3685c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.25%"
          style={{
            stopColor: "#3685c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.641%"
          style={{
            stopColor: "#3786c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.031%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.812%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="58.594%"
          style={{
            stopColor: "#3787c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="59.375%"
          style={{
            stopColor: "#3787c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.156%"
          style={{
            stopColor: "#3688c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.938%"
          style={{
            stopColor: "#3788c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="61.719%"
          style={{
            stopColor: "#3788c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="62.5%"
          style={{
            stopColor: "#3789c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="63.281%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="64.062%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="64.844%"
          style={{
            stopColor: "#378aca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="65.625%"
          style={{
            stopColor: "#398aca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="67.188%"
          style={{
            stopColor: "#388bca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="68.75%"
          style={{
            stopColor: "#388bcb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="71.875%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="75%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="100%"
          style={{
            stopColor: "#388dcc",
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
      <ClipPath id="f">
        <Path
          transform="translate(-419.54 -303.16)"
          clipPath="url(#undefined)"
          d="M363.38 301.71c0 37.109 25.637 65.684 63.488 65.684 15.129 0 34.672-6.594 45.406-17.336v-17.094c-13.188 10.988-28.562 20.266-46.395 20.266-22.703 0-38.578-17.34-43.453-28.566l93.273-57.141c-7.324-14.168-25.883-28.574-48.355-28.574-36.617 0-63.965 25.645-63.965 62.762m14.16.242c0-27.594 20.992-48.844 49.805-48.844 11.246 0 20.527 4.64 26.148 10.746l-74.98 48.113c-.738-3.18-.973-6.844-.973-10.016"
          strokeLinecap="round"
        />
      </ClipPath>
      <Path
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "url(#g)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="translate(-419.54 -303.16)"
        d="M363.38 367.39H475.7V238.94H363.38z"
      />
    </G>
    <G transform="matrix(.78 0 0 .78 543.82 351.25)" clipPath="url(#h)">
      <LinearGradient
        id="i"
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(-90 430.99 -91.85) scale(71.93)"
        x1={-0.393}
        y1={0}
        x2={1.393}
        y2={0}
      >
        <Stop
          offset="0%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="12.5%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="18.75%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="21.875%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="22.266%"
          style={{
            stopColor: "#1c4ba1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="22.656%"
          style={{
            stopColor: "#1d4ca1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="23.047%"
          style={{
            stopColor: "#1e4da2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="23.438%"
          style={{
            stopColor: "#1e4ea2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="23.828%"
          style={{
            stopColor: "#1e4fa3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="24.219%"
          style={{
            stopColor: "#1f50a4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="24.609%"
          style={{
            stopColor: "#1f51a4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25%"
          style={{
            stopColor: "#2052a5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25.391%"
          style={{
            stopColor: "#2053a6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25.781%"
          style={{
            stopColor: "#2154a6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="26.172%"
          style={{
            stopColor: "#2255a7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="26.562%"
          style={{
            stopColor: "#2256a7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="26.953%"
          style={{
            stopColor: "#2157a8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="27.344%"
          style={{
            stopColor: "#2158a9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="27.734%"
          style={{
            stopColor: "#2359a9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="28.125%"
          style={{
            stopColor: "#235aaa",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="28.516%"
          style={{
            stopColor: "#245baa",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="28.906%"
          style={{
            stopColor: "#255bab",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="29.297%"
          style={{
            stopColor: "#235cab",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="29.688%"
          style={{
            stopColor: "#245eac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="30.078%"
          style={{
            stopColor: "#255eac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="30.469%"
          style={{
            stopColor: "#255fad",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="30.859%"
          style={{
            stopColor: "#2660ae",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="31.25%"
          style={{
            stopColor: "#2561ae",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="31.641%"
          style={{
            stopColor: "#2662af",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.031%"
          style={{
            stopColor: "#2762af",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.422%"
          style={{
            stopColor: "#2763b0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.812%"
          style={{
            stopColor: "#2664b0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.203%"
          style={{
            stopColor: "#2765b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.594%"
          style={{
            stopColor: "#2865b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.984%"
          style={{
            stopColor: "#2766b2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.375%"
          style={{
            stopColor: "#2867b2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.766%"
          style={{
            stopColor: "#2967b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.156%"
          style={{
            stopColor: "#2a68b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.547%"
          style={{
            stopColor: "#2969b4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.938%"
          style={{
            stopColor: "#2a6ab4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.328%"
          style={{
            stopColor: "#2b6ab5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.719%"
          style={{
            stopColor: "#2b6bb5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.109%"
          style={{
            stopColor: "#2b6cb6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.5%"
          style={{
            stopColor: "#2a6cb6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.891%"
          style={{
            stopColor: "#2c6db6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.281%"
          style={{
            stopColor: "#2d6eb7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.672%"
          style={{
            stopColor: "#2c6fb8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.062%"
          style={{
            stopColor: "#2d6fb8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.453%"
          style={{
            stopColor: "#2c70b8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.844%"
          style={{
            stopColor: "#2d70b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.234%"
          style={{
            stopColor: "#2f71b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.625%"
          style={{
            stopColor: "#2d72ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.016%"
          style={{
            stopColor: "#2e72ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.406%"
          style={{
            stopColor: "#2e73ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.797%"
          style={{
            stopColor: "#2f73bb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.188%"
          style={{
            stopColor: "#2e74bb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.578%"
          style={{
            stopColor: "#2f75bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.969%"
          style={{
            stopColor: "#2f75bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.359%"
          style={{
            stopColor: "#3076bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.75%"
          style={{
            stopColor: "#2f76bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.141%"
          style={{
            stopColor: "#3177bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.531%"
          style={{
            stopColor: "#3077bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.922%"
          style={{
            stopColor: "#3178be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.312%"
          style={{
            stopColor: "#3078be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.703%"
          style={{
            stopColor: "#3279bf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.094%"
          style={{
            stopColor: "#3179bf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.484%"
          style={{
            stopColor: "#327abf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.875%"
          style={{
            stopColor: "#327bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.266%"
          style={{
            stopColor: "#317bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.656%"
          style={{
            stopColor: "#337bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.047%"
          style={{
            stopColor: "#327cc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.438%"
          style={{
            stopColor: "#337cc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.828%"
          style={{
            stopColor: "#337dc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.219%"
          style={{
            stopColor: "#347dc2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.609%"
          style={{
            stopColor: "#347dc2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50%"
          style={{
            stopColor: "#337ec2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.391%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.781%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.172%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.562%"
          style={{
            stopColor: "#3581c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.953%"
          style={{
            stopColor: "#3481c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.344%"
          style={{
            stopColor: "#3481c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.734%"
          style={{
            stopColor: "#3582c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.125%"
          style={{
            stopColor: "#3583c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.516%"
          style={{
            stopColor: "#3583c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.906%"
          style={{
            stopColor: "#3683c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.297%"
          style={{
            stopColor: "#3584c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.688%"
          style={{
            stopColor: "#3584c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.078%"
          style={{
            stopColor: "#3584c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.469%"
          style={{
            stopColor: "#3684c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.859%"
          style={{
            stopColor: "#3685c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.25%"
          style={{
            stopColor: "#3685c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.641%"
          style={{
            stopColor: "#3786c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.031%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.812%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="58.594%"
          style={{
            stopColor: "#3787c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="59.375%"
          style={{
            stopColor: "#3787c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.156%"
          style={{
            stopColor: "#3688c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.938%"
          style={{
            stopColor: "#3788c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="61.719%"
          style={{
            stopColor: "#3788c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="62.5%"
          style={{
            stopColor: "#3789c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="63.281%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="64.062%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="64.844%"
          style={{
            stopColor: "#378aca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="65.625%"
          style={{
            stopColor: "#398aca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="67.188%"
          style={{
            stopColor: "#388bca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="68.75%"
          style={{
            stopColor: "#388bcb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="71.875%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="75%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="100%"
          style={{
            stopColor: "#388dcc",
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
      <ClipPath id="h">
        <Path
          transform="translate(-522.84 -303.17)"
          clipPath="url(#undefined)"
          d="M507.45 266.3h-.492v-27.352l-14.16 2.934v125.51l14.16-2.93v-61.54c0-30.765 18.8-49.815 34.195-49.815 1.941 0 4.148 0 5.625.246l6.098-14.406c-22.723 0-36.633 6.352-45.426 27.352"
          strokeLinecap="round"
        />
      </ClipPath>
      <Path
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "url(#i)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="translate(-522.84 -303.16)"
        d="M492.8 367.39h60.078V238.94H492.8z"
      />
    </G>
    <G transform="matrix(.78 0 0 .78 598.17 351.25)" clipPath="url(#j)">
      <LinearGradient
        id="k"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 -71.93 71.93 0 592.93 339.14)"
        x1={-0.393}
        y1={0}
        x2={1.393}
        y2={0}
      >
        <Stop
          offset="0%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="12.5%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="18.75%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="21.875%"
          style={{
            stopColor: "#1e4aa0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="22.266%"
          style={{
            stopColor: "#1c4ba1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="22.656%"
          style={{
            stopColor: "#1d4ca1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="23.047%"
          style={{
            stopColor: "#1e4da2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="23.438%"
          style={{
            stopColor: "#1e4ea2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="23.828%"
          style={{
            stopColor: "#1e4fa3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="24.219%"
          style={{
            stopColor: "#1f50a4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="24.609%"
          style={{
            stopColor: "#1f51a4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25%"
          style={{
            stopColor: "#2052a5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25.391%"
          style={{
            stopColor: "#2053a6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="25.781%"
          style={{
            stopColor: "#2154a6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="26.172%"
          style={{
            stopColor: "#2255a7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="26.562%"
          style={{
            stopColor: "#2256a7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="26.953%"
          style={{
            stopColor: "#2157a8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="27.344%"
          style={{
            stopColor: "#2158a9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="27.734%"
          style={{
            stopColor: "#2359a9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="28.125%"
          style={{
            stopColor: "#235aaa",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="28.516%"
          style={{
            stopColor: "#245baa",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="28.906%"
          style={{
            stopColor: "#255bab",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="29.297%"
          style={{
            stopColor: "#235cab",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="29.688%"
          style={{
            stopColor: "#245eac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="30.078%"
          style={{
            stopColor: "#255eac",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="30.469%"
          style={{
            stopColor: "#255fad",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="30.859%"
          style={{
            stopColor: "#2660ae",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="31.25%"
          style={{
            stopColor: "#2561ae",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="31.641%"
          style={{
            stopColor: "#2662af",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.031%"
          style={{
            stopColor: "#2762af",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.422%"
          style={{
            stopColor: "#2763b0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="32.812%"
          style={{
            stopColor: "#2664b0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.203%"
          style={{
            stopColor: "#2765b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.594%"
          style={{
            stopColor: "#2865b1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="33.984%"
          style={{
            stopColor: "#2766b2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.375%"
          style={{
            stopColor: "#2867b2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="34.766%"
          style={{
            stopColor: "#2967b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.156%"
          style={{
            stopColor: "#2a68b3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.547%"
          style={{
            stopColor: "#2969b4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="35.938%"
          style={{
            stopColor: "#2a6ab4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.328%"
          style={{
            stopColor: "#2b6ab5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="36.719%"
          style={{
            stopColor: "#2b6bb5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.109%"
          style={{
            stopColor: "#2b6cb6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.5%"
          style={{
            stopColor: "#2a6cb6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="37.891%"
          style={{
            stopColor: "#2c6db6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.281%"
          style={{
            stopColor: "#2d6eb7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="38.672%"
          style={{
            stopColor: "#2c6fb8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.062%"
          style={{
            stopColor: "#2d6fb8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.453%"
          style={{
            stopColor: "#2c70b8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="39.844%"
          style={{
            stopColor: "#2d70b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.234%"
          style={{
            stopColor: "#2f71b9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="40.625%"
          style={{
            stopColor: "#2d72ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.016%"
          style={{
            stopColor: "#2e72ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.406%"
          style={{
            stopColor: "#2e73ba",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="41.797%"
          style={{
            stopColor: "#2f73bb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.188%"
          style={{
            stopColor: "#2e74bb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.578%"
          style={{
            stopColor: "#2f75bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="42.969%"
          style={{
            stopColor: "#2f75bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.359%"
          style={{
            stopColor: "#3076bc",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="43.75%"
          style={{
            stopColor: "#2f76bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.141%"
          style={{
            stopColor: "#3177bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.531%"
          style={{
            stopColor: "#3077bd",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="44.922%"
          style={{
            stopColor: "#3178be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.312%"
          style={{
            stopColor: "#3078be",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="45.703%"
          style={{
            stopColor: "#3279bf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.094%"
          style={{
            stopColor: "#3179bf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.484%"
          style={{
            stopColor: "#327abf",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="46.875%"
          style={{
            stopColor: "#327bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.266%"
          style={{
            stopColor: "#317bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="47.656%"
          style={{
            stopColor: "#337bc0",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.047%"
          style={{
            stopColor: "#327cc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.438%"
          style={{
            stopColor: "#337cc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="48.828%"
          style={{
            stopColor: "#337dc1",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.219%"
          style={{
            stopColor: "#347dc2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.609%"
          style={{
            stopColor: "#347dc2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50%"
          style={{
            stopColor: "#337ec2",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.391%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="50.781%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.172%"
          style={{
            stopColor: "#3480c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.562%"
          style={{
            stopColor: "#3581c3",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="51.953%"
          style={{
            stopColor: "#3481c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.344%"
          style={{
            stopColor: "#3481c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="52.734%"
          style={{
            stopColor: "#3582c4",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.125%"
          style={{
            stopColor: "#3583c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.516%"
          style={{
            stopColor: "#3583c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="53.906%"
          style={{
            stopColor: "#3683c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.297%"
          style={{
            stopColor: "#3584c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="54.688%"
          style={{
            stopColor: "#3584c5",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.078%"
          style={{
            stopColor: "#3584c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.469%"
          style={{
            stopColor: "#3684c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="55.859%"
          style={{
            stopColor: "#3685c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.25%"
          style={{
            stopColor: "#3685c6",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="56.641%"
          style={{
            stopColor: "#3786c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.031%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="57.812%"
          style={{
            stopColor: "#3686c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="58.594%"
          style={{
            stopColor: "#3787c7",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="59.375%"
          style={{
            stopColor: "#3787c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.156%"
          style={{
            stopColor: "#3688c8",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="60.938%"
          style={{
            stopColor: "#3788c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="61.719%"
          style={{
            stopColor: "#3788c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="62.5%"
          style={{
            stopColor: "#3789c9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="63.281%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="64.062%"
          style={{
            stopColor: "#388ac9",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="64.844%"
          style={{
            stopColor: "#378aca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="65.625%"
          style={{
            stopColor: "#398aca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="67.188%"
          style={{
            stopColor: "#388bca",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="68.75%"
          style={{
            stopColor: "#388bcb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="71.875%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="75%"
          style={{
            stopColor: "#398ccb",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="100%"
          style={{
            stopColor: "#388dcc",
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
      <ClipPath id="j">
        <Path
          transform="translate(-592.93 -303.16)"
          clipPath="url(#undefined)"
          d="M555.08 274.6c0 42.977 64.703 25.152 64.703 55.918 0 15.141-11.957 22.711-26.371 22.711-13.188 0-21.488-4.64-30.773-13.43l-10.723 9.035c9.52 11.23 23.188 18.56 38.332 18.56 23.922 0 43.695-11.966 43.695-37.606 0-45.418-64.703-25.152-64.703-55.922 0-13.918 11.723-20.758 25.633-20.758 11.242 0 20.762 5.133 29.309 11.484l8.066-11.238c-11.723-8.3-21.734-14.406-36.637-14.406-21.004 0-40.53 13.188-40.53 35.652"
          strokeLinecap="round"
        />
      </ClipPath>
      <Path
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "url(#k)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="translate(-592.93 -303.16)"
        d="M551.92 367.39h82.027V238.94H551.92z"
      />
    </G>
    <Path
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#3a3939",
        fillRule: "evenodd",
        opacity: 1,
      }}
      vectorEffect="non-scaling-stroke"
      transform="matrix(.78 0 0 .78 135.31 114.89)"
      d="m662.29 196.95 15.133-3.906v171.42l-15.133 1.953z"
    />
    <Path
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#3a3939",
        fillRule: "evenodd",
        opacity: 1,
      }}
      vectorEffect="non-scaling-stroke"
      transform="matrix(.78 0 0 .78 134.902 114.79)"
      d="M710.16 366.42V241.88l14.16-2.934v20.27h.492c6.586-10.988 20.512-20.27 35.398-20.27 23.691 0 45.656 9.282 45.656 43.223v82.293l-14.145 1.953v-87.418c0-17.828-11.488-27.352-31.02-27.352-13.434 0-36.383 9.77-36.383 33.457v79.36z"
    />
    <Path
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#3a3939",
        fillRule: "evenodd",
        opacity: 1,
      }}
      vectorEffect="non-scaling-stroke"
      transform="matrix(.78 0 0 .78 134.28 114.907)"
      d="M889.89 253.11c-29.055 0-48.598 25.152-48.598 49.57 0 28.57 19.543 50.547 49.082 50.547 27.344 0 49.34-23.199 49.34-49.816 0-31.742-22.969-50.301-49.824-50.301m49.824-62.512 14.156-2.93v176.79l-14.156 2.93v-23.441h-.496c-9.285 12.207-28.07 23.441-48.105 23.441-35.66 0-63.98-26.129-63.98-64.711 0-35.895 28.074-63.734 63.488-63.734 20.035 0 36.629 10.504 48.598 24.176h.496z"
    />
    <Path
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#3a3939",
        fillRule: "evenodd",
        opacity: 1,
      }}
      vectorEffect="non-scaling-stroke"
      transform="matrix(.78 0 0 .78 133.429 114.787)"
      d="M1074 353.23c17.34 0 29.539-12.941 29.539-30.281 0-18.07-12.449-30.52-30.031-30.52-18.805 0-32.965 12.695-32.965 32.234 0 18.066 17.094 28.566 33.457 28.566m-30.293-106.95c11.242-4.64 23.445-7.328 35.66-7.328 19.047 0 38.344 10.012 38.344 31.016v94.5l-14.172 2.93V352.01h-.48c-4.887 9.039-15.625 15.387-30.047 15.387-25.141 0-46.641-16.117-46.641-42.73 0-27.11 17.828-46.398 44.945-46.398 12.199 0 23.922 6.84 32.223 14.164V271.92c0-10.262-12.45-18.81-28.816-18.81-11.72 0-24.906 6.11-35.641 9.77z"
    />
    <Path
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#3a3939",
        fillRule: "evenodd",
        opacity: 1,
      }}
      vectorEffect="non-scaling-stroke"
      transform="matrix(.78 0 0 .78 133.786 114.786)"
      d="m988.31 367.39 14.16-2.93V235.2a767.298 767.298 0 0 1-14.16 9.688z"
    />
    <Path
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#f5821e",
        fillRule: "evenodd",
        opacity: 1,
      }}
      vectorEffect="non-scaling-stroke"
      transform="matrix(.78 0 0 .78 133.43 115.48)"
      d="M1102.6 147.53c-18.844 8.512-29.609 12.895-21.359 11.355 9.766-1.832 33.91-12.098 37.684-14.191 0 0-11.496 28.625-42.445 36.055-30.941 7.434-55.488 4.531-73.164 41.387 0 0 10.336-48.266 25.848-77.895 15.504-29.625 40.398-26.691 68.91-31.176 28.512-4.492 36.766-12.152 41.484-26.93 2.98 21.781-3.86 31.605-22.316 39.027-11.234 4.516-23.938 8.797-24.488 10.168-.95 2.371 38.723-10.918 37.441-8.676-6.605 11.551-16.191 15.727-27.594 20.875"
    />
    <Path
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#00a64f",
        fillRule: "evenodd",
        opacity: 1,
      }}
      vectorEffect="non-scaling-stroke"
      transform="matrix(.78 0 0 .78 133.89 115.561)"
      d="M947.11 114.02c11.539 17.156 18.383 26.551 12.18 20.902-7.34-6.7-22.457-28.145-24.562-31.914 0 0-5.3 30.391 17.094 53.008 22.391 22.617 44.785 33.07 40.406 73.711 0 0 16.629-46.473 19.047-79.828 2.422-33.348-20.289-43.965-42.164-62.793-21.871-18.836-24.855-29.695-21.082-44.742-14.008 16.949-13.363 28.902-1.586 44.934 7.176 9.754 15.72 20.082 15.465 21.535-.441 2.516-27.168-29.672-27.258-27.09-.469 13.297 5.48 21.895 12.461 32.277"
    />
  </Svg>
)

export default Logo2
