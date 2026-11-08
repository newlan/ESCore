
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from "vite-plugin-compression";//gzip
import externalGlobals from "rollup-plugin-external-globals";//排除公共库 要知道库挂载名称
import { join } from 'path';
import fs from 'fs';
import path from 'path';



const fKey = `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2ymjNiA7wKlfT
z5E3V23XJr/shHgXVWrnZLhnVLCQU3d8e+RkdMDbBi/uzH3tT9+7bJejt/uMQCea
oJO8XwnLeZHOyyqsu1/3vCgp1DtPOnEGXJ0R/HX1HrEdPy+4qikB6a6Aoy0JBqNq
uLldxAaK8YQy7JP+ulUWKrdUGUIO76+QOnvrXq8HqajjbFJu6jkVcQsXRnlY2ehB
/EqaLd5013WL9zPoDjwgmbRtOA5mg6bpEnC0jV/9MeO39HSDpLzWUNS/ZaFJWUC4
wssBz0W+/tq5yZinHD7nm5jEltgnajROubjBnf7B6alKfqmo/YKs3tAGCcKJjsmf
B6TBXyoXAgMBAAECggEAT5VZwt6RjmwJGB2fnoYwuwNSfVIBjTsx07QM+2QqiXPl
qmuweTJCAzoy5VfgHdHwWYRCk1PXr+0AsThnihSgyZfQ7UWUe2cLNeuUWv3dorWR
nxD0i++slb+6oj6v8skXGI+a28PvqCXdQWpSvmnJ5XWYtqk9GCMdR4zqi7GBismA
XyXA7Gqj5qsqgYUxn+h4puhWmhhP2R6lhnKdLA0MmFf8vCxBeN3ldWedKAYMhUqV
3OTPxGulSmqY8C8uLaqcTTLFGvn2goosr5nA4Csz8IfB/hJXNgkU5K0g9MDN8XUt
j0c/IMgZEJi9sI+L+KBLJZNxkfjDsdyorDMrJOSIJQKBgQDqdBT25cTDx06WsfQc
Yh/qrfToRyYiXP8scjjQuZQZ1Ra0P6p+SDxstqoRHZqttoFF4o63aAQQFX+PsPNQ
6o+nscDQM8aCwb3IPoGNvC0DjlufhO5UW5zChlqzfyAIWnBi76g6Iq4G1fSpk9On
eXw3pD/j4e50OPIihFMXMTogcwKBgQDHlt9IShw0yEsEzQ3do8zTq2pyoddMytYh
NzsbQOzzJ0AfxC6xURHfB/01GCYIbqp5r1eG2QvWi8RU6JfVHhjozivhKZbg8Sfb
Rzts/oop3E3r8hbMHyyTu0FI4Oi57wzR+Q4SmnC/hcTKTRIr+H7y8I2GSuzUdjXE
XhKCGvqazQKBgFdxYhxPyBpo7IPB7VTkuBi0NsKnPq7UVovCMjSO8pDL7ALgN/uP
f5Hgcv+dNgKSLhbdj/MRxWomSoRSL/2+7kNSRaKhnOlJzzmvLmypgXRxFPUjBCzM
WmQm7g9CW7Uh3gbYcbr1EkkUZYMV0nwFEHJEPVwF+QS59H0xMzhUMOTHAoGAEmwB
hemZOuH10qaejgONZ0geFiCL/8GFDCHN6dEPTc4kpAn2iVVDQgO5wknNUN/uCjc9
6+tipVXXNEMXqIsTn4FQGYM+MtrvY9TqTkAcPorgAlQg+Iw0EBqrhu+Da4397+99
9gedOoA9TrLYZ4iTJxc+6NNHksCqa8qHCM02rk0CgYEAyJMjueVcHJvLYGTzn9gN
A/p+g+jdQNTmCn7IUq+Fh3ucQEhaEgM1uti8jSCikPXj2hACDIygwV+QWANskmIT
YV0G5rmbGCmZ8HLX7XZbfNndTsTRRZpVI9uLzeDLB7Yz8gdaux6l0GcXE966cgy4
h2DFV3+xXOd0lVXEMOq1MCg=
-----END PRIVATE KEY-----
`;
const fpem = `
-----BEGIN CERTIFICATE-----
MIIFAjCCA+qgAwIBAgISBcKX3Vq27P/v9g/Y75JtQRiWMA0GCSqGSIb3DQEBCwUA
MDMxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQwwCgYDVQQD
EwNZUjIwHhcNMjYxMDE5MDMxODMzWhcNMjcwMTE3MDMxODMyWjAYMRYwFAYDVQQD
Ew1tMi5zYW0zMjIuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
tspozYgO8CpX08+RN1dt1ya/7IR4F1Vq52S4Z1SwkFN3fHvkZHTA2wYv7sx97U/f
u2yXo7f7jEAnmqCTvF8Jy3mRzssqrLtf97woKdQ7TzpxBlydEfx19R6xHT8vuKop
AemugKMtCQajari5XcQGivGEMuyT/rpVFiq3VBlCDu+vkDp7616vB6mo42xSbuo5
FXELF0Z5WNnoQfxKmi3edNd1i/cz6A48IJm0bTgOZoOm6RJwtI1f/THjt/R0g6S8
1lDUv2WhSVlAuMLLAc9Fvv7aucmYpxw+55uYxJbYJ2o0Trm4wZ3+wempSn6pqP2C
rN7QBgnCiY7JnwekwV8qFwIDAQABo4ICKTCCAiUwDgYDVR0PAQH/BAQDAgWgMBMG
A1UdJQQMMAoGCCsGAQUFBwMBMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFMMBB/xK
+qrB+5nwCYPFj9Ok8XJ3MB8GA1UdIwQYMBaAFEAVLSZ57TIgnt+ach3WMh+BDIEM
MDMGCCsGAQUFBwEBBCcwJTAjBggrBgEFBQcwAoYXaHR0cDovL3lyMi5pLmxlbmNy
Lm9yZy8wJgYDVR0RBB8wHYIMbS5zYW0zMjIuY29tgg1tMi5zYW0zMjIuY29tMBMG
A1UdIAQMMAowCAYGZ4EMAQIBMC4GA1UdHwQnMCUwI6AhoB+GHWh0dHA6Ly95cjIu
Yy5sZW5jci5vcmcvMjMuY3JsMIIBDAYKKwYBBAHWeQIEAgSB/QSB+gD4AH4AooEA
GHNOF24dR+CVQPOBulRml81jqENQcW64CU7a8Q0AAAGhUmCUpgAIAAAFACfFZWAE
AwBHMEUCIQDxvV++svH/CHvQ+6d/YmX9lKZJ6RnvFYX6Ge6vL8bP1gIgSrOP7KWu
LIwUtWmrqH9MLNgHBfA2pwG5YywAtYYI51gAdgDW1Y2p0BdT82pKoMdXSQKv68fc
LNOM2fdkyAyJGR6fAgAAAaFSYJrZAAAEAwBHMEUCIQDa/kk3WR29/2UZFwVoaua6
2wY9maOlusRuHLV1hSdPoQIgchembF0+dUfjQi2n0EhfSvKOOe8idJ18gYuftTA1
OkwwDQYJKoZIhvcNAQELBQADggEBAB3ZWMRrWR4gNzs7U9JIJLPtF0KzWo07De6c
YZc7RyVrVadVsvEzoTFY4pkXZXpMfhOzNdi/YHCvjMFg3ntOdDI3S2QNR7vqVTm1
F1JhkZJyJ6bMJI9gfRFYejSqeDXn8KQrenKBW9DAukMZPd2Tbf63sSXY4ylHvC31
h9mvwnL3CFjgqW4jwEZbAAJPgVNWXXLYJIX/ke+Nzrb8ns+Ds+HeEq27pPs5HGn0
prQJHhIQqTDoGQ/xuBMUYGpSjVt9qdzggPE4twHNE/JU2zLW0vgq2vOWNlZyBrwB
vtkbjz3iuQrWTm50WqvWNODuGvRmvW7BashP07LFNjlTFa8oPS8=
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIE2jCCAsKgAwIBAgIQTr0klH4k05SALYSlL9WzGTANBgkqhkiG9w0BAQsFADAu
MQswCQYDVQQGEwJVUzENMAsGA1UEChMESVNSRzEQMA4GA1UEAxMHUm9vdCBZUjAe
Fw0yNTA5MDMwMDAwMDBaFw0yODA5MDIyMzU5NTlaMDMxCzAJBgNVBAYTAlVTMRYw
FAYDVQQKEw1MZXQncyBFbmNyeXB0MQwwCgYDVQQDEwNZUjIwggEiMA0GCSqGSIb3
DQEBAQUAA4IBDwAwggEKAoIBAQDZ0LxwBppqh84luqMerV/eeL/fXQ7mLQQv1Lnp
WKZbyvGpx6wh6AfnslAnF6ewTkcHA+gSOoBvm3Dfm06AuGiF+KRut4fAcowqnAQQ
CW98+QPP/eOv/wug7Iyk4NkOxf2I6g2f55T6nJoOTLFcukeRq80JGQEYan+dPFr9
OGUgQK2hGKgNkW87pappsOAuUJcroYhRt5uUis4qaZireiseu32gzDJNBAiKtsvd
6HX4v25bpkRNcS/B/Gtc9kVbUpD+2PLPxdei3Tim55k4tfAEXwD2qyiPTxrTNq6l
N+AMr5g2c1dNqkOTwjxeV6L5lpP1rGiYvLnRaPlOqyZRPW+5AgMBAAGjge4wgesw
DgYDVR0PAQH/BAQDAgGGMBMGA1UdJQQMMAoGCCsGAQUFBwMBMBIGA1UdEwEB/wQI
MAYBAf8CAQAwHQYDVR0OBBYEFEAVLSZ57TIgnt+ach3WMh+BDIEMMB8GA1UdIwQY
MBaAFN7nW2DQIm1AKH0/DQH+pLVStFGUMDIGCCsGAQUFBwEBBCYwJDAiBggrBgEF
BQcwAoYWaHR0cDovL3lyLmkubGVuY3Iub3JnLzATBgNVHSAEDDAKMAgGBmeBDAEC
ATAnBgNVHR8EIDAeMBygGqAYhhZodHRwOi8veXIuYy5sZW5jci5vcmcvMA0GCSqG
SIb3DQEBCwUAA4ICAQB0ZUQWZ9/Yn9COEpo+JfecMnB0h0vwDm/M66IqXqw3LoaL
mx9lZvRTeDIS67PUeI3yCA2W6PKRD0/FE/G57lOmS+Xy5AaaL00ICGOqjNcCaMWW
8o8nevHOd4i4lqgtznE/28QwlcdJyF8yBiWHpnyjhEpmNWJURgOCOg2xpwRMBCsj
MScqYPtOhBeuYQvSwAEeTML2Ukh6uGuX4E14q65Ja8cdjF5bAldnP1eE4FBaAwsZ
G2fOqqrKV03Y85Nw2btedP1AtliQuJZs/Jo/gXxXdc7LrH3McgnpnbTiAncX7yES
hP6kzQejllqMCIt52HOjxDGWafS7Xw+DKwqmH+Eqy8dcbOuag/1AYlQoKNVK3F5q
Hh6tEDiMqQcLIibGKteE6iHo4A/bIScbzrhXUYuism42ZYzmc48FMVIH3qy4L84E
TdAH2gtxw0PAhvRVXp8HP7wfngpzsN/8xOTpeRSbM4+Qbc56G6+Bifmv6sk1ieQb
NA3wJdl4DDUuQSV8hBgx6zoI1ZSGORprDFux7c6rhc77QZMSRrEgomBeklervEve
86ylWmZ3WWHV6RLMi8xNvjd71r4EPIGgY7BZU/VPBkq+uA7Gb6mbJnFgV43uh3xy
LRFgxIAphIukwTGSMZZR+AI+Qnp0BYTWovHXozOf3H8r6hozEoT02JHn0AeTfA==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
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
-----END CERTIFICATE-----


`;

function resolve(dir:any){
	// console.log(__dirname,'这里是档期目录');
	return join(__dirname,dir);
}
// https://vitejs.dev/config/

export default defineConfig(({ command }) => {

	console.log('当前模式',command, path.resolve(__dirname, './public/static'));
	if (command === 'build') {
		const staticDir = path.resolve(__dirname, './public/static')
		if (fs.existsSync(staticDir)) {
			fs.rmSync(staticDir, { recursive: true, force: true })
			console.log('已清空:', staticDir)
		}
	}
	return {
		root:'./Vue',
		plugins: [vue(),viteCompression()],
		base:'.',
		resolve:{
			alias:{
				'@':resolve('/Vue/src'),
				'smkj':resolve('/Vue/src/libs/'),
				"@N":resolve("/Node/"),
			}
		},
		build:{
			outDir:'../public/',
			assetsDir:'./static',
			minify:'terser',
			terserOptions:{
				toplevel:true
			},
			// minify:'esbuild',
			cssTarget:"chrome61",
			emptyOutDir:false,
			chunkSizeWarningLimit:780,
			assetsInlineLimit:4096,
			rollupOptions:{
				// input:"./Vue/index.html",
				// external:['vue','element-plus','gsap','vant','ant-design-vue','axios'],
				external:[],
				plugins:[
					externalGlobals({
						// vue:'Vue',
						// 'element-plus':'ElementPlus',
						// 'ant-design-vue':'antd',
						// gsap:'gsap',
						// vant:'vant',
						// 'axios':'axios',
					}),
				]
			}
		},
		server:{
			host:'0.0.0.0',
			// host:'192.168.1.106',
			// host:'172.16.0.50',
			port:443,
			https: {
				key: fKey,
				cert: fpem
				// key: fs.readFileSync(path.resolve(__dirname, 'public/certs/server.key')),
				// cert: fs.readFileSync(path.resolve(__dirname, 'public/certs/server.crt')),
			},
			proxy:{
				"^/io":{
					target:'http://127.0.0.1:3012',
					ws:true,
					changeOrigin:true
				},
				"^/api/":{
					target:'http://127.0.0.1:3011',
					changeOrigin:true,
				},
				"^/qqMaps/":{
					target:'http://127.0.0.1:3011',
					changeOrigin:true,
				}
			}
		},
		optimizeDeps:{
		},
		css:{
			preprocessorOptions:{
				CSS:{
					charset:false
				}
			}
		}
	}

})
