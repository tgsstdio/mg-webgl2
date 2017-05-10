def parseLine(line):
  tokens = line.split()

  if (len(tokens) == 0):
      return ''

  translatedTypes = {}
  translatedTypes['bool'] = 'boolean'
  translatedTypes['UInt32'] = 'number'
  translatedTypes['UInt64'] = 'number'
  translatedTypes['UInt32[]'] = 'Array<number>'
  translatedTypes['int'] = 'number'
  translatedTypes['string'] = 'string'
  translatedTypes['string[]'] = 'Array<string>'
  translatedTypes['float'] = 'number'
  translatedTypes['float[]'] = 'Array<number>'
  translatedTypes['Result'] = 'MgResult'

  paramName = tokens[2][0].lower() + tokens[2][1:]

  comment = ''
  if tokens[1] == 'UInt64':
    comment = '// WARN: ' + paramName + ' requires UInt64 \n'

  localType = tokens[1]
  if localType in translatedTypes:
     localType = translatedTypes[localType]

  return comment + paramName + ' : ' + localType + ';'

textData = """  
		public MgImageCreateFlagBits Flags { get; set; }
		public MgImageType ImageType { get; set; }
		public MgFormat Format { get; set; }
		public MgExtent3D Extent { get; set; }
		public UInt32 MipLevels { get; set; }
		public UInt32 ArrayLayers { get; set; }
		public MgSampleCountFlagBits Samples { get; set; }
		public MgImageTiling Tiling { get; set; }
		public MgImageUsageFlagBits Usage { get; set; }
		public MgSharingMode SharingMode { get; set; }
		public UInt32[] QueueFamilyIndices { get; set; }
		public MgImageLayout InitialLayout { get; set; }
		"""		

for line in textData.split('\n'):
  print(parseLine(line))



  
